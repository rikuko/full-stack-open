
const blogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10
    },
]

const newBlog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
}

const blogWithoutLikes = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
}

const blogWithoutTitle = {
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
}

const blogWithoutUrl = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin'
}

const newUser = {
    username: 'tero',
    name: 'Tero Testaaja',
    password: 'salainen'
}

const userWithoutPassword = {
    username: 'maija',
    name: 'Maija Maadoittaja'
}
const userWithoutUsername = {
    name: 'Tero Testaaja',
    password: 'salainen'
}
const userWithShortPassword = {
    username: 'tero',
    name: 'Tero Testaaja',
    password: 'sa'
}
const userWithShortUsername = {
    username: 'te',
    name: 'Tero Testaaja',
    password: 'salainen'
}
const userWithExistingUsername = {
    username: 'system',
    name: 'System User',
    passwordHash: 'salainen'
}

module.exports = {
    blogs,
    newBlog,
    blogWithoutLikes,
    blogWithoutTitle,
    blogWithoutUrl,
    newUser,
    userWithoutPassword,
    userWithoutUsername,
    userWithShortPassword,
    userWithShortUsername,
    userWithExistingUsername
}