const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'Invalid id format' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'Username must be unique' })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({ error: 'Token missing or invalid' })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'Token expired. Please login.' })
    } else if (error.name === 'TypeError') {
        return response.status(400).json({ error: 'Invalid request' })
    }
    next(error)
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

// Token for posting blogs
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    } else {
        request.token = null
    }
    next()
}

module.exports = {
    errorHandler,
    unknownEndpoint,
    requestLogger,
    tokenExtractor
}
