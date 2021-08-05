import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'testTitle',
    author: 'authorName',
    url: 'test.com',
    likes: 4565,
    user: {
      id: '610aebc41ea0a27ecbe45cca',
      name: 'PersonName'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  // // method 1
  expect(component.container).toHaveTextContent('authorName')
  expect(component.container).toHaveTextContent('testTitle')

  expect(component.container).not.toHaveTextContent('test.com')
  expect(component.container).not.toHaveTextContent('4565')

  // // method 2
  // const element = component.getByText(
  //   'Component testing is done with react-testing-library'
  // )
  // expect(element).toBeDefined()

  // // method 3
  // const div = component.container.querySelector('.note')
  // expect(div).toHaveTextContent(
  //   'Component testing is done with react-testing-library'
  // )

  // component.debug()
  // console.log(prettyDOM(div))
})

// test('clicking the button calls event handler once', () => {
//   const blog = {
//     title: 'test3',
//     url: 'test.com/3',
//     likes: 4565,
//     user: {
//       id: '610aebc41ea0a27ecbe45cca',
//       name: 'test person'
//     }
//   }

//   const mockHandler = jest.fn()

//   const component = render(
//     <Blog blog={blog} />
//   )

//   const button = component.getByText('make not important')
//   fireEvent.click(button)

//   expect(mockHandler.mock.calls).toHaveLength(1)
// })