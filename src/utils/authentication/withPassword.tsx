import { useRouter } from 'next/router'

import { firebase } from '../firebase'

export const signUpWithPassword = async ( email: string, password: string) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    useRouter().push('/')
  } catch (error) {
    alert(error.message)
  }
}

export const signInWithPassword = async (email: string, password: string) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    useRouter().push('/')
  } catch (error) {
    alert(error.message)
  }
}