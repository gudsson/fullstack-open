const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  return blogs.length === 0
    ? 0
    : blogs.reduce((a, c) => a + c.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}
  
  return blogs.reduce((a, c) => a.likes > c.likes ? a : c)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}