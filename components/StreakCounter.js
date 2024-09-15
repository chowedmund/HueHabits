import { Fugaz_One } from 'next/font/google';
import React from 'react';
const fugaz = Fugaz_One({ subsets: ['latin'] , weight: ['400']});

export default function StreakCounter({ streak }) {
  return (
    <div className='bg-blue-100 flex flex-col gap-3 p-8 rounded-lg shadow-md w-5/6 sm:max-w-sm relative'>
      <h2 className={'text-blue-800 text-center text-3xl sm:text-5xl text-base font-bold ' + fugaz.className}>Your Streak</h2>
      <p className={'text-blue-800 font-bold text-5xl truncate text-center ' + fugaz.className}>🔥 {streak}</p>
    </div>
  );
}