'use client'

import React from 'react'
import Button from './Button'
import LoginCard from './LoginCard'
import Calendar from './Calendar/Calendar'

export default function Hero() {
  const [showModal, setShowModal] = React.useState(false)
  const [showSignInModal, setShowSignInModal] = React.useState(false)
  const [showCreateAccountModal, setCreateAccountModal] = React.useState(false)
  const [register, setRegister] = React.useState(false)

  const handleAccountClick = (value) => {
    setShowModal(true);
    setRegister(value);
  };


  return (
    <div className='p-8 md:p-20 flex flex-1 items-center flex-col md:flex-row gap-8 sm:gap-10'>
      <div className='flex-1'>
        <p className='text-lg sm:text-xl md:text-2xl w-full mx-auto max-w-[1000px] mb-5'>
          HueHabits provides simple and clutter-free habit tracking so that you can focus on what is important: staying consistent
        </p>
        <div className='flex gap-2'>
          <Button text="Get Started" dark onClick={() =>  handleAccountClick(true)} />
          <Button text="Sign In" onClick={() => handleAccountClick(false)} />
        </div>

      </div>
      
      <div className='flex-1 h-full'>
        <Calendar />
      </div>

      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <LoginCard setShowModal={setShowModal} register={register} setRegister={setRegister}/>
        </div>
      )}
    </div>
  )
}
