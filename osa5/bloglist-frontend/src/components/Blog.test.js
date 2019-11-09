import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    user: '123',
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 5
  }

  const component = render(
    <Blog blog={blog} />
  )

  const infoDiv = component.container.querySelector('.noInfo')

  expect(infoDiv).toHaveTextContent(
    'title author'
  )

  fireEvent.click(infoDiv)

  const likeDiv = component.container.querySelector('.likes')

  expect(likeDiv).toHaveTextContent(
    '5'
  )

  const urlDiv = component.container.querySelector('.url')

  expect(urlDiv).toHaveTextContent(
    'url'
  )

  const adderDiv = component.container.querySelector('.adder')

  expect(adderDiv).toHaveTextContent(
    'Added by'
  )

})