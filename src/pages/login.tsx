/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FiLogIn } from 'react-icons/fi'

import { login } from '@/store/actions/auth'
import { toast } from 'react-toastify'

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()

  const initialForm = {
    username: '',
    password: ''
  }
  const [form, setForm] = useState(initialForm)

  // ----- handle form update -----
  const handleOnChangeUsername = (event: any) => {
    setForm({
      ...form,
      username: event.target.value
    })
  }
  const handleOnChangePassword = (event: any) => {
    setForm({
      ...form,
      password: event.target.value
    })
  }

  // ----- handle login -----

  const onLogin = async (data: any) => {
    if (data.username && data.password) {
      try {
        const { firstName } = await dispatch(login(data))
        setForm(initialForm)
        router.replace('/')
        toast.success(`Welcome back, ${firstName}`)
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    }
  }

  // ----- handle form submit -----
  const submitHandler = (e: any) => {
    e.preventDefault()
    onLogin(form)
  }

  return (
    <>
      <Head>
        <title>Login to Todo App - by Derrint</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 antialiased bg-slate-200 text-slate-700 mx-2">
        <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
          <h1 className="text-4xl font-medium">Login</h1>
          <p className="text-slate-500">Hi, Welcome back 👋</p>

          <form onSubmit={submitHandler} className="mt-8">
            <div className="flex flex-col space-y-5">
              <label htmlFor="email">
                <p className="font-medium text-slate-700 pb-2">Username</p>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter username"
                  value={form.username}
                  onChange={handleOnChangeUsername}
                />
              </label>
              <label htmlFor="password">
                <p className="font-medium text-slate-700 pb-2">Password</p>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleOnChangePassword}
                />
              </label>

              <button
                className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                onClick={submitHandler}
              >
                <FiLogIn size={20} />
                <span>Login</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
