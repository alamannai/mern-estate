import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

export default function OAuth() {
    const dispath = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName, 
                    email: result.user.email,
                    photo: result.user.photoURL
                }),
            })
            const data = await res.json()
            dispath(signInSuccess(data))
            navigate('/')
        } catch (error) {
            console.log('could not sign in with google', error)
        }
    }
  return (
    <button onClick={handleGoogleClick} 
        className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white"
    >
        <img src="./src/assets/google.svg" alt="img" className="w-6 h-6 inline mr-2" />
        Connecter avec Google
    </button>
  )
}
