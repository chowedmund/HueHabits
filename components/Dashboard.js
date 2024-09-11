'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Main from './Main';
import StreakCounter from './StreakCounter';
import HabitChecklist from './HabitChecklist';
import Calendar from './Calendar';

export default function Dashboard() {
  const isAuth = true;
  const router = useRouter();
  const statuses = {
    num_days: 14,
    time_remaining: '13:14:25',
    date: (new Date()).toString()
  }

  const [habits, setHabits] = useState([
      { name: 'Exercise', completed: false },
      { name: 'Read', completed: false },
      { name: 'Meditate', completed: false }, 
  ]);

  useEffect(() => {
    if (!isAuth) {
      router.push('/');
    }
  }, [isAuth, router]);

  if (!isAuth) {
    return null;
  }

  const handleCheck = (index) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit, i) =>
        i === index ? { ...habit, completed: true } : habit
      )
    );
  };

  return (
    <div className='p-8 md:p-20 flex flex-1 items-center flex-col md:flex-row gap-8 sm:gap-10'>
      <div className='flex flex-col flex-1'>
        <StreakCounter streak={statuses.num_days} />
        <HabitChecklist habits={habits} onCheck={handleCheck} />
      </div>
      <div className='flex-1'>
        <Calendar />
      </div>
    </div>
  );
}
