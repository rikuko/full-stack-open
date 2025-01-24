import React from 'react'

const Message = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div>
            <div className='message'>
                {message}
            </div>
        </div>
    )
}

export default Message
