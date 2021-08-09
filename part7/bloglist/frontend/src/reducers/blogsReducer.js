import blogsService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogsReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  console.log(action.type)
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INCREMENT_VOTES': {
    const blogIdx = state.findIndex(a => a.id === action.data.id)
    const newObject = { ...state[blogIdx], likes: state[blogIdx].likes + 1 }
    const newState = [...state]
    newState[blogIdx] = newObject
    return newState
  }
  case 'INIT_BLOGS':
    console.log('hello')
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
    dispatch(setNotification(`added '${blog.title}' by ${blog.author}`))
  }
}

export const vote = (id) => {
  console.log('dispatching vote')

  return {
    type: 'INCREMENT_VOTES',
    data: { id }
  }
}

export default blogsReducer