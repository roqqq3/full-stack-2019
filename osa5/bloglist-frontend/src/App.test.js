import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    const notes = component.container.querySelectorAll('.noInfo')
    expect(notes.length).toBe(0)
  })
  test('if user is logged in, blogs are rendered', async () => {
    const user = {
      username: 'name',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('blogs')
    )

    const notes = component.container.querySelectorAll('.noInfo')
    expect(notes.length).toBe(1)
  })
})