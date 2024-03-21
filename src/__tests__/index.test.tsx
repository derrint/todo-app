/* eslint-disable @typescript-eslint/no-var-requires */
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'

import store from '@/store/store'
import Home, {
  logoutButtonTestid,
  pageSubtitleTestid,
  pageTitleTestid,
  todoButtonAddTestid,
  todoButtonDeleteTestid,
  todoButtonUpdateTestid,
  todoCheckboxTestid,
  todoInputTestid,
  todoItemDetailsInputTestid,
  todoItemNameInputTestid,
  todoItemNameTestid,
  todoItemTestid
} from '@/pages/index'
import { server } from '@/mock/api/server'
import todoApi from '@/api/todo'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen()
})

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers()
  // This is the solution to clear RTK Query cache after each test
  store.dispatch(todoApi.util.resetApiState())
})

// Clean up after the tests are finished.
afterAll(() => server.close())

describe('Home page', () => {
  const customRender = () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }

  describe('Render method', () => {
    it('should have title & subtitle', () => {
      customRender()

      const title = screen.getByTestId(pageTitleTestid)
      const subtitle = screen.getByTestId(pageSubtitleTestid)

      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Todo List')
      expect(subtitle).toBeInTheDocument()
      expect(subtitle).toHaveTextContent('here are your latest tasks.')
    })

    it('should render todo items correctly', async () => {
      customRender()

      await waitFor(() => {
        const todoItems = screen.getAllByTestId(todoItemTestid)
        expect(todoItems).toHaveLength(7)
      })
    })

    it('should be able to add new todo', async () => {
      customRender()

      const todoInput = screen.getByTestId(todoInputTestid)
      const todoButtonAdd = screen.getByTestId(todoButtonAddTestid)

      fireEvent.change(todoInput, { target: { value: 'Pick-up laundry' } })
      expect(todoInput).toHaveValue('Pick-up laundry')

      fireEvent.click(todoButtonAdd)
      await waitFor(() => {
        expect(todoInput).toHaveValue('')
      })

      fireEvent.change(todoInput, { target: { value: 'Make-up bed' } })
      expect(todoInput).toHaveValue('Make-up bed')

      fireEvent.keyDown(todoInput, { key: 'Enter', code: 13, charCode: 13 })
      await waitFor(() => {
        expect(todoInput).toHaveValue('')
      })

      const todoItems = screen.getAllByTestId(todoItemTestid)
      expect(todoItems).toHaveLength(7)
    })

    it('should be able to check todo', async () => {
      customRender()

      await waitFor(async () => {
        const todoItems = screen.getAllByTestId(todoCheckboxTestid)
        expect(todoItems).toHaveLength(7)
        expect(todoItems[0]).toHaveClass('is-unchecked')

        fireEvent.click(todoItems[0])

        expect(todoItems[0]).toHaveClass('is-unchecked')
      })
    })

    it('should be able to open todo details', async () => {
      customRender()

      await waitFor(async () => {
        const todoItems = screen.getAllByTestId(todoItemNameTestid)
        expect(todoItems).toHaveLength(7)
        expect(todoItems[0]).toHaveClass('visible')

        fireEvent.click(todoItems[0])

        expect(todoItems[0]).toHaveClass('hidden')
      })
    })

    it('should be able to save updated todo', async () => {
      customRender()

      await waitFor(async () => {
        const todoItems = screen.getAllByTestId(todoButtonUpdateTestid)
        expect(todoItems).toHaveLength(7)

        const todoItemNameInputs = screen.getAllByTestId(todoItemNameInputTestid)
        fireEvent.change(todoItemNameInputs[0], { target: { value: 'Open the bottle' } })
        expect(todoItemNameInputs[0]).toHaveValue('Go to the gym')

        const todoItemDetailsInputs = screen.getAllByTestId(todoItemDetailsInputTestid)
        fireEvent.change(todoItemDetailsInputs[0], { target: { value: 'Please open it slowly' } })
        expect(todoItemDetailsInputs[0]).toHaveValue(`Don't forget to bring a towel`)

        fireEvent.click(todoItems[0])

        const newTodoItems = screen.getAllByTestId(todoButtonUpdateTestid)
        expect(newTodoItems).toHaveLength(7)
      })
    })

    it('should be able to delete todo', async () => {
      customRender()

      await waitFor(async () => {
        const removableTodoItems = screen.getAllByTestId(todoButtonDeleteTestid)
        expect(removableTodoItems).toHaveLength(7)

        fireEvent.click(removableTodoItems[2])

        const newRemovableTodoItems = screen.getAllByTestId(todoButtonDeleteTestid)
        expect(newRemovableTodoItems).toHaveLength(7)
      })
    })

    it('should be able to logout', async () => {
      const replace = jest.fn()
      const useRouter = jest.spyOn(require('next/router'), 'useRouter')
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        replace
      }))

      customRender()

      const logoutButton = screen.getByTestId(logoutButtonTestid)
      expect(logoutButton).toBeInTheDocument()

      fireEvent.click(logoutButton)
      expect(replace).toHaveBeenCalledWith('/login')
    })
  })
})
