import React from 'react';
import Button from './Button';

export default function LoginCard({ setShowModal, register, setRegister }) {

  return (
    <div className="bg-white p-8 rounded rounded-lg shadow-md w-full max-w-sm relative">
      <h1 className='text-2xl font mb-6 text-center'>HueHabits</h1>
      <form>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex items-center justify-between">
          <Button text={register ? "Register" : "Sign In"} dark />
          <p className='text-s text-center'>{ register ? "Got an account? " : "No account? "}<button onClick={() => setRegister(!register)} className='text-indigo-600'>{register ? 'Sign in' : 'Sign up'}</button></p>
        </div>
        
      </form>
      <button
        className='absolute top-4 right-4 text-black'
        onClick={() => setShowModal(false)}
      >
        x
      </button>
    </div>
  );
}