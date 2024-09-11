'use client'

import React from 'react'
import Button from './Button'
import LoginCard from './LoginCard'
import Calendar from './Calendar/Calendar'

export default function Hero() {
  const [showModal, setShowModal] = React.useState(false)

  return (
    <div className='p-8 md:p-20 flex flex-1 items-center flex-col md:flex-row gap-8 sm:gap-10'>
      <div className='flex-1'>
        <p className='text-lg sm:text-xl md:text-2xl w-full mx-auto max-w-[1000px] mb-5'>
          HueHabits provides simple and clutter-free habit tracking so that you can focus on what is important: staying consistent
        </p>
        <Button text="Get Started" onClick={() => setShowModal(true)} />
      </div>
      
      <div className='flex-1 h-full'>
        <Calendar />
      </div>

      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <LoginCard setShowModal={setShowModal} />
        </div>
      )}
    </div>
  )
}
