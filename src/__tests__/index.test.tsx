/* eslint-disable @typescript-eslint/no-var-requires */
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'
import thunk from 'redux-thunk'

import configureMockStore from 'redux-mock-store'

import Home, {
  logoutButtonTestid,
  pageSubtitleTestid,
  pageTitleTestid,
  resetButtonTestid,
  todoButtonAddTestid,
  todoButtonRemoveTestid,
  todoButtonUpdateTestid,
  todoInputTestid,
  todoItemTestid
} from '@/pages/index'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const initialState = {
  todos: [
    {
      id: 28,
      todo: 'Go to the gym',
      completed: false,
      userId: 15
    },
    {
      id: 30,
      todo: 'Take cat on a walk',
      completed: false,
      userId: 15
    },
    {
      id: 42,
      todo: 'Wash car',
      completed: false,
      userId: 15
    },
    {
      id: 56,
      todo: 'Go on a fishing trip with some friends',
      completed: false,
      userId: 15
    },
    {
      id: 91,
      todo: 'Prepare a 72-hour kit',
      completed: true,
      userId: 15
    },
    {
      id: 126,
      todo: 'Take a bubble bath',
      completed: true,
      userId: 15
    },
    {
      id: 128,
      todo: 'Paint the first thing I see',
      completed: false,
      userId: 15
    }
  ],
  auth: {
    isSignedIn: true,
    user: {
      id: 15,
      username: 'kminchelle',
      email: 'kminchelle@qq.com',
      firstName: 'Jeanne',
      lastName: 'Halvorson',
      gender: 'female',
      image: 'https://robohash.org/autquiaut.png',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZyIsImlhdCI6MTY4OTMxMTM4OSwiZXhwIjoxNjg5MzE0OTg5fQ.uIiohrGDwGa2Zufij_Zq7Wwe_spDm6F-PmhhOiAMReI'
    }
  }
}
const updatedStore = mockStore(() => initialState)

beforeEach(() => {
  // ! WE MAKE SURE THE MOCKS ARE CLEARED BEFORE EACH TEST CASE
  useSelectorMock.mockClear()
  useDispatchMock.mockClear()
})

afterAll(() => {
  cleanup()
})

// ! SETUP THE SPY ON USESELECTOR / USE DISPATCH
// ! WE DO THIS TO BE ABLE TO CHECK IF THE DISPATCH MOCK GOT CALLED AND HOW MANY TIMES
const reactRedux = { useDispatch, useSelector }
const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')

describe('Home page', () => {
  const customRender = () => {
    render(
      <Provider store={updatedStore}>
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

    it('should render todo items correctly', () => {
      customRender()

      const todoItems = screen.getAllByTestId(todoItemTestid)
      expect(todoItems).toHaveLength(7)
    })

    it('should be able to add new todo', async () => {
      customRender()

      const todoInput = screen.getByTestId(todoInputTestid)
      const todoButtonAdd = screen.getByTestId(todoButtonAddTestid)

      fireEvent.change(todoInput, { target: { value: 'Pick-up laundry' } })
      expect(todoInput).toHaveValue('Pick-up laundry')

      fireEvent.click(todoButtonAdd)
      expect(todoInput).toHaveValue('')

      fireEvent.change(todoInput, { target: { value: 'Make-up bed' } })
      expect(todoInput).toHaveValue('Make-up bed')

      fireEvent.keyDown(todoInput, { key: 'Enter', code: 13, charCode: 13 })
      expect(todoInput).toHaveValue('')

      const todoItems = screen.getAllByTestId(todoItemTestid)
      expect(todoItems).toHaveLength(7)
    })

    it('should be able to update todo', async () => {
      customRender()

      const incompleteTodoItems = screen.getAllByTestId(todoButtonUpdateTestid)
      expect(incompleteTodoItems).toHaveLength(5)

      fireEvent.click(incompleteTodoItems[0])
      const newIncompleteTodoItems = screen.getAllByTestId(todoButtonUpdateTestid)
      expect(newIncompleteTodoItems).toHaveLength(5)
    })

    it('should be able to delete todo', async () => {
      customRender()

      const removableTodoItems = screen.getAllByTestId(todoButtonRemoveTestid)
      expect(removableTodoItems).toHaveLength(7)

      fireEvent.click(removableTodoItems[2])
      const newRemovableTodoItems = screen.getAllByTestId(todoButtonRemoveTestid)
      expect(newRemovableTodoItems).toHaveLength(7)
    })

    it('should be able to reset todo', async () => {
      customRender()

      const resetButton = screen.getByTestId(resetButtonTestid)
      fireEvent.click(resetButton)
      expect(resetButton).toBeInTheDocument()
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
