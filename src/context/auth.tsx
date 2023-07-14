/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { loadApp } from '@/store/actions/auth'

const ProtectRoute = ({ children }: any) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { isSignedIn } = useSelector((state: any) => state.auth)

  const authRoute = (isSignedIn: boolean, paths: string[]) => {
    // ----- prevent routing for some cases -----
    if (isSignedIn === false && paths.includes(router.pathname)) {
      setTimeout(() => {
        toast.error('You need to login to see Todo page.')

        router.push('/login')
      }, 200)
    }
  }

  const protectedRoutes = ['/']

  useEffect(() => {
    dispatch(loadApp())
    authRoute(isSignedIn, protectedRoutes)
  }, [isSignedIn, router.pathname])

  return children
}

export { ProtectRoute }
