const dummy = (blogs) => {
  return blogs.length === 0 ? 1 : 0
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}


module.exports = {
  dummy,
  totalLikes
}