'use client'
import React, { useState, useEffect } from 'react'
import StreakCounter from './StreakCounter'
import HabitChecklist from './HabitChecklist'
import Calendar from './Calendar'
import LoginCard from './LoginCard'
import { useAuth } from '@/context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj } = useAuth()
  const [data, setData] = useState({})
  const [ allHabitsCompleted, setAllHabitsCompleted ] = useState(false)

  const now = new Date()
  const day = now.getDate()
  const month = now.getMonth()
  const year = now.getFullYear()

  const [habits, setHabits] = useState([])

  function countStreak() {
    let dates = []

    for (let year in data) {
      if (!isNaN(year)) {
        for (let month in data[year]) {
          if (!isNaN(month)) {
            for (let day in data[year][month]) {
              if (!isNaN(day)) {
                dates.push(new Date(parseInt(year), parseInt(month), parseInt(day)));
              }
            }
          }
        }
      }
    }

    dates.sort((a, b) => a - b)

    let streakCount = 0
    let currentDate = new Date()
    if (!allHabitsCompleted) {
      currentDate.setDate(currentDate.getDate() - 1) // Start from the previous day
    }

    for (let i = dates.length - 1; i >= 0; i--) {
      if (dates[i].toDateString() === currentDate.toDateString()) {
        streakCount++
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }

    return streakCount
  }

  const statuses = {
    num_days: countStreak()
  }

  useEffect(() => {
    if(!currentUser || !userDataObj) {
      return
    }
    setData(userDataObj)


    if (userDataObj?.habits) {
      setHabits(userDataObj?.habits)
    }
    
    if (userDataObj?.[year]?.[month]?.[day]) {
      setAllHabitsCompleted(true)
      setHabits((prevHabits) =>
        prevHabits.map((habit) => ({ ...habit, completed: true }))
      )
    }
  }, [currentUser, userDataObj])

  useEffect(() => {
    if (allHabitsCompleted) {
      updateFirebase()
    }
  }, [allHabitsCompleted])


  async function updateFirebase() {
    try {
      const newData = {...userDataObj}
      if (!newData?.[year]) {
        newData[year] = {}
      }
      if (!newData[year]?.[month]) {
        newData[year][month] = {}
      }
  
      newData[year][month][day] = true
  
      setData(newData)
  
      setUserDataObj(newData)
  
      const docRef = doc(db, 'users', currentUser.uid)

      const res = await setDoc(docRef, {
        [year]: {
          [month]: {
            [day]: true
          }
        }
      }, { merge: true })
      
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleCheck = (index) => {
    setHabits((prevHabits) => {
      const updatedHabits = prevHabits.map((habit, i) =>
        i === index ? { ...habit, completed: true } : habit
      )

      updateHabitsInFirebase(updatedHabits)

      // Check if all habits are completed
      const allCompleted = updatedHabits.every(habit => habit.completed)
      console.log('allCompleted', allCompleted)
      if (allCompleted) {
        setAllHabitsCompleted(true)
      }

      console.log('updatedHabits', updatedHabits)
      return updatedHabits
    })
  }

  const updateHabitsInFirebase = async (updatedHabits) => {
    try {
      const docRef = doc(db, 'users', currentUser.uid)
      await setDoc(docRef, { habits: updatedHabits }, { merge: true })
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleAddHabit = async (habitName) => { 
    const newHabit = { name: habitName, completed: false }
    const updatedHabits = [...habits, newHabit]
    setHabits(updatedHabits)

    try {
      const docRef = doc(db, 'users', currentUser.uid);
      await setDoc(docRef, { habits: updatedHabits }, { merge: true })
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleDeleteHabit = async (index) => {
    const updatedHabits = habits.filter((habit, i) => i !== index)
    setHabits(updatedHabits)

    try {
      const docRef = doc(db, 'users', currentUser.uid)
      await setDoc(docRef, { habits: updatedHabits }, { merge: true })
    } catch (error) {
      console.log(error.message)
    }
  }

  if (!currentUser) {
    return (
      <div className='flex justify-center items-center w-screen'>
        <LoginCard />
      </div>
    )
  }

  console.log('habits in dashboard', habits)

  return (
    <div className='p-8 md:p-20 flex flex-1 items-center flex-col md:flex-row gap-8 sm:gap-10'>
      <div className='flex flex-col flex-1 items-center gap-8 w-full'>
        <StreakCounter streak={statuses.num_days} />
        <HabitChecklist 
          allHabitsCompleted={allHabitsCompleted}
          habits={habits} 
          onCheck={handleCheck} 
          onAddHabit={handleAddHabit}
          onDeleteHabit={handleDeleteHabit}
        />
      </div>
      <div className='flex-1'>
        <Calendar completeData={data}/>
      </div>
    </div>
  )
}
