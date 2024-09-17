'use client'

import React, { useState } from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'

export default function LoginCard() {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ register, setRegister ] = useState(false)
  const [ authenticating, setAuthenticating ] = useState(false)
  const { signup, login } = useAuth()

  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      alert('Please fill in all fields')
      return
    }
    setAuthenticating(true)
    try {
      if (register) {
        console.log('Registering new user')
        await signup(email, password)
      } else {
        console.log('Logging in user')
        await login(email, password)
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setAuthenticating(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded rounded-lg shadow-md w-full max-w-sm relative">
      <h1 className='text-2xl mb-6 text-center'>HueHabits</h1>

      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center">
        <Button onClick={handleSubmit} text={authenticating ? "Submitting" : "Submit"} dark />
      </div>

      <p className='text-s text-center mt-3'>{ register ? "Got an account? " : "No account? "}<button onClick={() => setRegister(!register)} className='text-indigo-600'>{register ? 'Sign in' : 'Sign up'}</button></p>
    </div>
  )
}