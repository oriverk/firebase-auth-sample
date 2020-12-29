import { useEffect, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { firebase } from '../utils/firebase'
import { AuthContext } from '../context/Auth'
import { useInput } from '../hooks/useInput'

const Login: React.FC = () => {
  const router = useRouter()
  const { currentUser } = useContext(AuthContext)
  const emailProps = useInput('')
  const passwordProps = useInput('')  

  useEffect(() => {
    currentUser && router.push('/')
  }, [currentUser])

  const signInWithPassword = async (e) => {
    e.preventDefault()
    try {
      await firebase.auth().signInWithEmailAndPassword(emailProps.value, passwordProps.value)
      router.push('/')
    } catch (error) {
      alert(error.message)
    }
  }

  const signUpWithGoogle = async (e) => {
    e.preventDefault()
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      await firebase.auth().signInWithRedirect(provider)
      router.push('/')
    } catch (error) {
      alert(error.message)
    }
  }

  const signUpWithTwitter = async (e) => {
    e.preventDefault()
    try {
      const provider = new firebase.auth.TwitterAuthProvider()
      await firebase.auth().signInWithRedirect(provider)
      router.push('/')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className='wrapper'>
      <div className='twitter-auth'>
        <button onClick={signUpWithTwitter}>Login with Twitter</button>
      </div>
      <div className='google-auth'>
        <button onClick={signUpWithGoogle}>Login with Google</button>
      </div>
      <form className='email-auth' onSubmit={signInWithPassword}>
        <div>
          <label htmlFor="email" className='auth-label'>
            Email:{' '}
          </label>
          <input
            id="email"
            className='auth-input'
            type="email"
            {...emailProps}
            />
        </div>
        <div>
          <label htmlFor="password" className='password'>
            Password:{' '}
          </label>
          <input
            id="password"
            className='auth-input'
            type="password"
            {...passwordProps}
          />
        </div>
        <button className='auth-btn' type="submit">
          Login
        </button>
      </form>
      <Link href='/signup'>
        <a className='auth-link'>signup</a>
      </Link>
    </div>
  );
}

export default Login
