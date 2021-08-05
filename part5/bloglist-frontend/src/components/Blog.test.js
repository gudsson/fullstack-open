import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

let blog

beforeEach(async () => {
  blog = {
    title: 'testTitle',
    author: 'authorName',
    url: 'test.com',
    likes: 4565,
    user: {
      id: '610aebc41ea0a27ecbe45cca',
      name: 'PersonName'
    }
  }
})

test('renders content', () => {
  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('authorName')
  expect(component.container).toHaveTextContent('testTitle')

  expect(component.container).not.toHaveTextContent('test.com')
  expect(component.container).not.toHaveTextContent('4565')
})
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


test('clicking the button calls event handler once', () => {
  // const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('show')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('test.com')
  expect(component.container).toHaveTextContent('4565')
})