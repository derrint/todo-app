/* eslint-disable @typescript-eslint/no-var-requires */
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'
import thunk from 'redux-thunk'

import configureMockStore from 'redux-mock-store'

import Login, {
  loginButtonTestid,
  pageSubtitleTestid,
  pageTitleTestid,
  passwordInputTestid,
  usernameInputTestid
} from '@/pages/login'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const initialState = {
  auth: {
    isSignedIn: false,
    user: {}
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

describe('Login page', () => {
  const customRender = () => {
    render(
      <Provider store={updatedStore}>
        <Login />
      </Provider>
    )
  }

  describe('Render method', () => {
    it('should have title & subtitle', () => {
      customRender()

      const title = screen.getByTestId(pageTitleTestid)
      const subtitle = screen.getByTestId(pageSubtitleTestid)

      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Login')
      expect(subtitle).toBeInTheDocument()
      expect(subtitle).toHaveTextContent('Hi, Welcome back')
    })

    it('should be able to log user in', async () => {
      const replace = jest.fn()
      const useRouter = jest.spyOn(require('next/router'), 'useRouter')
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        replace
      }))

      customRender()

      const usernameInput = screen.getByTestId(usernameInputTestid)
      const passwordInput = screen.getByTestId(passwordInputTestid)

      fireEvent.change(usernameInput, { target: { value: 'kminchelle' } })
      expect(usernameInput).toHaveValue('kminchelle')

      fireEvent.change(passwordInput, { target: { value: '0lelplR' } })
      expect(passwordInput).toHaveValue('0lelplR')

      const loginButton = screen.getByTestId(loginButtonTestid)
      expect(loginButton).toBeInTheDocument()

      fireEvent.click(loginButton)
      waitFor(() => {
        expect(usernameInput).toHaveValue('')
        expect(passwordInput).toHaveValue('')
        expect(screen.findByText('Welcome back, Jeanne')).toBeInTheDocument()
      })

      // expect(replace).toHaveBeenCalledWith('/')
    })
  })
})
