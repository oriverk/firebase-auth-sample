import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'

import { firebase } from '../utils/firebase'
// import { AuthContext } from '../context/Auth'

const Home: React.FC = () => {
  const router = useRouter()
  // const { currentUser } = useContext(AuthContext)
  const [currentUser, setCurrentUser] = useState<null | object>(null)
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : router.push('/login')
    })
  }, [])
  
  const logOut = async () => {
    try {
      await firebase.auth().signOut()
      router.push('/login')
    } catch (error) {
      alert(error.message)
    }
  }
  
  return (
    <div>
      <pre>{currentUser && JSON.stringify(currentUser, null, 4)}</pre>
      <button onClick={logOut}>Logout</button>
    </div>
  )
}

export default Home