/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiCheck, FiCheckCircle, FiPlus, FiRotateCcw, FiTrash2 } from 'react-icons/fi'

import { addTodo, getTodosByUser, removeTodo, updateTodo } from '@/store/actions/todo'
import { ITodo } from '@/interfaces/todo'
import { logout } from '@/store/actions/auth'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { todos, auth } = useSelector((state: any) => state)
  const userId = auth?.user?.id

  const [newTodo, setNewTodo] = useState('')

  // ----- handle get todo -----

  const onGetTodo = () => {
    dispatch(getTodosByUser(userId))
  }

  // ----- handle add todo -----

  const onAddTodo = (todo: string) => {
    const newTodoData = {
      todo,
      completed: false,
      userId
    }

    if (newTodo) {
      dispatch(addTodo(newTodoData))
      setNewTodo('')
    }
  }

  const handleOnChangeNewTodo = (event: any) => {
    setNewTodo(event.target.value)
  }

  const handleKeyDownNewTodo = (event: any) => {
    if (event.key === 'Enter') {
      onAddTodo(event.target.value)
    }
  }

  // ----- handle update todo -----

  const handleUpdateTodo = (id: number | string, data: ITodo) => {
    const newData = {
      ...data,
      completed: true
    }
    dispatch(updateTodo(id, newData))
  }

  // ----- handle remove todo -----

  const handleRemoveTodo = (id: number | string) => {
    dispatch(removeTodo(id))
  }

  // ----- handle on load -----

  useEffect(() => {
    onGetTodo()
  }, [])

  // ----- handle logout -----

  const onLogout = async () => {
    dispatch(logout())
    router.replace('/login')
    toast.success(`See you..`)
  }

  return (
    <>
      <Head>
        <title>Todo App - by Derrint</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 antialiased bg-slate-200 text-slate-700 mx-2">
        <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
          <div className="flex flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-medium">Todo List</h1>
            </div>
            <div className="inline-flex space-x-2 items-center">
              <button
                onClick={() => onGetTodo()}
                className="p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center text-indigo-200 hover:text-white bg-indigo-600 hover:bg-indigo-500"
              >
                <FiRotateCcw size={16} />
                <span className="text-sm font-medium hidden md:block">Reset</span>
              </button>
            </div>
          </div>
          <p className="text-slate-500">Hello {auth?.user?.firstName}, here are your latest tasks.</p>

          <div id="tasks" className="my-8">
            <div
              id="task"
              className="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent gap-5"
            >
              <div className="inline-flex items-center space-x-2 align-middle flex-grow">
                <input
                  type="text"
                  value={newTodo}
                  onChange={handleOnChangeNewTodo}
                  onKeyDown={handleKeyDownNewTodo}
                  className="outline-none w-full border-slate-200"
                  placeholder="Add item here..."
                />
              </div>
              <button
                className="w-6 h-6 text-slate-500 hover:text-indigo-600"
                onClick={() => {
                  onAddTodo(newTodo)
                }}
              >
                <FiPlus size={20} />
              </button>
            </div>

            {todos.map((item: ITodo) => {
              return (
                <div
                  key={item.id}
                  id="task"
                  className={`flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent gap-5 ${
                    !item.completed &&
                    'bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 transition ease-linear duration-150'
                  }`}
                >
                  <div className="inline-flex items-center space-x-2 align-middle">
                    {item.completed ? (
                      <div className="w-6 h-6 text-slate-500">
                        <FiCheck size={20} />
                      </div>
                    ) : (
                      <button
                        className="w-6 h-6 text-slate-500 hover:text-indigo-600 hover:cursor-pointer"
                        onClick={() => {
                          handleUpdateTodo(item.id, item)
                        }}
                      >
                        <FiCheckCircle size={20} />
                      </button>
                    )}

                    <div className={item.completed ? 'text-slate-500 line-through' : ''}>{item.todo}</div>
                  </div>
                  <button
                    className="w-6 h-6 text-slate-500 hover:text-red-600"
                    onClick={() => {
                      handleRemoveTodo(item.id)
                    }}
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              )
            })}
          </div>
          <p className="text-xs text-slate-500 text-center">
            Already done with your things?{' '}
            <button onClick={onLogout} className="text-indigo-600">
              Log out
            </button>
          </p>
        </div>
      </main>
    </>
  )
}
