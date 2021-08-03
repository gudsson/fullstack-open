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

const mostBlogs = (blogs) => {
  const blogCount = {}

  blogs.forEach(blog => {
    (blogCount[blog.author] === undefined) ? blogCount[blog.author] = 1 : blogCount[blog.author] += 1
  })

  const topAuthor = Object.keys(blogCount).sort((a, b) => blogCount[b] - blogCount[a])[0]

  return { author: topAuthor, blogs: blogCount[topAuthor]}
}

const mostLikes = (blogs) => {
  const likeCount = {}

  blogs.forEach(blog => {
    (likeCount[blog.author] === undefined) ? likeCount[blog.author] = blog.likes : likeCount[blog.author] += blog.likes
  })

  const topAuthor = Object.keys(likeCount).sort((a, b) => likeCount[b] - likeCount[a])[0]

  return { author: topAuthor, likes: likeCount[topAuthor]}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}