import { useRouter } from 'next/router'

import { firebase } from '../firebase'

export const signInWithGoogle = () => {
  const router = useRouter()
  try {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
    router.push('/')
  } catch (error) {
    alert(error.message)
  }
}