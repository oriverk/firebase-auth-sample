import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'

import { firebase } from '../utils/firebase'
import { AuthContext } from '../context/Auth'
import { useInput } from '../hooks/useInput'


const Signup: React.FC = () => {
  const router = useRouter()
  const { currentUser } = useContext(AuthContext)
  const emailProps = useInput('')
  const passwordProps = useInput('')
  
  useEffect(() => {
    currentUser && router.push('/')
  }, [currentUser])

  const signUpWithPassword = async (e) => {
    e.preventDefault()
    try {
      await firebase.auth().createUserWithEmailAndPassword(emailProps.value, passwordProps.value)
      useRouter().push('/')
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
      <form className='auth' onSubmit={signUpWithPassword}>
        <div>
          <label htmlFor="email">
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
          <label htmlFor="password">
            Password:{' '}
          </label>
          <input
            id="password"
            className='auth-input'
            type="password"
            {...passwordProps}
          />
        </div>
        <button type="submit">
          Signup
        </button>
      </form>
      <Link href='/login'>
        <a>Login</a>
      </Link>
    </div>
  );
}

export default Signup;
