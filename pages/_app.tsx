import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Context from '../context/Context'
import NavBar from './NavBar/NavBar'
export default function App({ Component, pageProps }: AppProps) {
  return<>
  <Context>
  <NavBar/>
  <Component {...pageProps} />
  </Context>
  </>
}
