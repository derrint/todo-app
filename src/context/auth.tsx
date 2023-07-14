/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { loadApp } from '@/store/actions/auth'

const ProtectRoute = ({ children }: any) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const authRoute = (isSignedIn: boolean, paths: string[]) => {
    // ----- prevent routing for some cases -----
    if (isSignedIn === false && paths.includes(router.pathname)) {
      toast.error('You need to login to see Todo page.')

      router.push('/login')
    }
  }

  const protectedRoutes = ['/']

  const handleOnLoad = async () => {
    const { isSignedIn } = await dispatch(loadApp())
    authRoute(isSignedIn, protectedRoutes)
  }

  useEffect(() => {
    handleOnLoad()
  }, [])

  return children
}

export { ProtectRoute }
