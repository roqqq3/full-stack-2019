import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'title',
    author: 'author',
    likes: 5
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const infoDiv = component.container.querySelector('.info')

  expect(infoDiv).toHaveTextContent(
    'title author'
  )

  const likeDiv = component.container.querySelector('.likes')

  expect(likeDiv).toHaveTextContent(
    '5'
  )

})

test('clicking the like button twice calls the like handler twice', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    likes: 5
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})