import React from 'react'
import { Fragment_Mono } from "next/font/google";

const fragmentMono = Fragment_Mono({ subsets: ["latin"], weight: ["400"] });

export default function Navbar() {
  return (
    <header className='p-8 md:p-20 flex items-center justify-between'>
      <h1 className={"text-xl sm:text-2xl md:text-5xl text-slate-700 " + fragmentMono.className}>HueHabits</h1>
      <div className='flex w- items-center justify-between'>
        <p>Login</p>
      </div>
    </header>
  )
}
