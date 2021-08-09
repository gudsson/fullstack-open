import blogsService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogsReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'REMOVE_BLOG':
      return [...state].filter(blog => blog.id !== action.data)
    case 'INCREMENT_LIKES': {
      const blogIdx = state.findIndex(a => a.id === action.data.id)
      const newObject = { ...state[blogIdx], likes: state[blogIdx].likes + 1 }
      const newState = [...state]
      newState[blogIdx] = newObject
      return newState
    }
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogsService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
    dispatch(setNotification(`added '${blog.title}' by ${blog.author}`, 'success', 5))
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogsService.remove(blog)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog.id
    })
    dispatch(setNotification(`removed '${blog.title}' by ${blog.author}`, 'failure', 5))
  }
}


export const like = (id) => {
  return {
    type: 'INCREMENT_LIKES',
    data: { id }
  }
}

export default blogsReducer