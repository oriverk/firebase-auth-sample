import { AppProps } from 'next/app'
import { AuthProvider } from '../context/Auth'
import '../styles/globals.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps } />
    </AuthProvider>
  )
}

export default MyApp
