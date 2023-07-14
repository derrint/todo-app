import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import store from '@/store/store'
import '@/styles/globals.css'
import { ProtectRoute } from '@/context/auth'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ProtectRoute>
        <Component {...pageProps} />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
      </ProtectRoute>
    </Provider>
  )
}
