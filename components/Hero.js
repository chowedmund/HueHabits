import React from 'react'
import Button from './Button'
import LoginCard from './LoginCard'
import Calendar from './Calendar'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className='p-8 md:p-20 flex flex-1 items-center flex-col md:flex-row gap-8 sm:gap-10'>
      <div className='flex md:flex-1 flex-col p-2'>
        <p className='text-lg sm:text-xl md:text-xl lg:text-2xl w-full mx-auto max-w-[1000px] mb-5'>
          HueHabits provides simple and clutter-free habit tracking so that you can focus on what is important: staying consistent
        </p>
        <div className='flex gap-2'>
          <Link href={'/dashboard'}>
            <Button text="Get Started" dark />
          </Link>
          <Link href={'/dashboard'}>
            <Button text="Sign In" />
          </Link>
        </div>
      </div>
      
      <div className='flex-1 h-5/6 w-5/6 p-2'>
        <Calendar />
      </div>
    </div>
  )
}
