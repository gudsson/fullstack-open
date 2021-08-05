import React, { useState } from 'react'
import blogsService from '../services/blogs'

const NewBlog = ({ user, setBlogs, updateBanner }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      let blog = {
        title,
        author,
        url,
        user: user._id
      }

      await blogsService.create(blog)
      const blogs = await blogsService.getAll()
      updateBanner({
        response: 'success',
        message: `a new blog '${title}' by ${author} added`
      })

      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs)
    } catch (exception) {
      updateBanner({
        response: 'failure',
        message: 'Could not add post'
      })
    }
    console.log(user.name, 'adding blog post', title)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          title:
            <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlog