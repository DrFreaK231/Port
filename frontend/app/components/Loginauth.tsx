'use client'

import { signIn } from 'next-auth/react'
import '../styles/loginauth.css'

export default function Loginauth() {
  return (
    <div className='container'>
      <button onClick={()=>signIn('google', { callbackUrl: '/' })}>Login with Google</button>
      <button onClick={()=>signIn('facebook', { callbackUrl: '/' })}>Login with Facebook</button>
    </div>
  )
}
