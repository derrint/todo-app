/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { getToken } from '@/utils/helper'

const ProtectRoute = ({ children }: any) => {
  const router = useRouter()

  const authRoute = (isSignedIn: boolean, paths: string[]) => {
    // ----- prevent routing for some cases -----
    if (isSignedIn === false && paths.includes(router.pathname)) {
      toast.error('You need to login to see Todo page.')

      router.push('/login')
    } else if (isSignedIn === true && router.pathname === '/login') {
      toast.info('You are already logged in.')
      router.replace('/')
    }
  }

  const protectedRoutes = ['/']

  const handleOnLoad = async () => {
    let isSignedIn = false
    const token = getToken()

    if (token != null) {
      isSignedIn = true
    }
    authRoute(isSignedIn, protectedRoutes)
  }

  useEffect(() => {
    handleOnLoad()
  }, [])

  return children
}

export { ProtectRoute }
