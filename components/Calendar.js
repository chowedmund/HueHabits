'use client'
import React, {useState} from 'react'

const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
const monthsArr = Object.keys(months)
const today = new Date()
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function Calendar(props) {
  const { demo, completeData, handleSetDone } = props
  
  const now = new Date()
  const [selectedMonth, setSelectedMonth] = useState(Object.keys(months)[now.getMonth()])
  const [selectedYear, setSelectedYear] = useState(now.getFullYear())


  const numericMonth = Object.keys(months).indexOf(selectedMonth)
  const data = completeData?.[selectedYear]?.[numericMonth] || {}
  
  function handleIncrementMonth(val) {
    if (numericMonth + val < 0){
      setSelectedMonth(monthsArr[11])
      setSelectedYear(selectedYear - 1)
    } else if (numericMonth + val > 11) {
      setSelectedMonth(monthsArr[0])
      setSelectedYear(selectedYear + 1)
    } else {
      setSelectedMonth(monthsArr[numericMonth + val])
    }
    // let monthIndex = monthsArr.indexOf(selectedMonth)
    // if (monthIndex === 11) {
    //   setSelectedMonth(monthsArr[0])
    //   setSelectedYear(selectedYear + 1)
    // } else {
    //   setSelectedMonth(monthsArr[monthIndex + 1])
    // }
  }
 
  const monthNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth), 1)
  const firstDayOfMonth = monthNow.getDay()
  const daysInMonth = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth) + 1, 0).getDate()

  const daysToDisplay = firstDayOfMonth + daysInMonth
  const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-5 gap4'>
        <button onClick={() => handleIncrementMonth(-1)}>Prev</button>
        <div className='text-center col-span-3 whitespace-nowrap'>{selectedMonth} {selectedYear}</div>
        <button onClick={() => handleIncrementMonth(1)}>Next</button>
      </div>
      <div className='flex flex-col overflow-hidden gap-1'>
        {[...Array(numRows).keys()].map((row,rowIndex) => {
          return (
            <div key={rowIndex} className='grid grid-cols-7 gap-1'>
              {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                let dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayOfMonth - 1)
                
                let dayDisplay = dayIndex > daysInMonth ? false : (row === 0 && dayOfWeekIndex < firstDayOfMonth) ? false : true

                let isToday = dayIndex === today.getDate()

                if (!dayDisplay) {
                  return (
                    <div className='bg-white' key={dayOfWeekIndex}></div>
                  )
                }

                let color = dayIndex in data ? 
                  'radial-gradient(circle at 20% 30%, #cce7ff, transparent 50%),' +
                  'radial-gradient(circle at 80% 70%, #ccedff, transparent 50%),' +
                  'radial-gradient(circle at 50% 50%, #ccccff, transparent 50%),' +
                  'radial-gradient(circle at 30% 80%, #ccffff, transparent 50%),' +
                  'radial-gradient(circle at 70% 20%, #ccffcc, transparent 50%),' +
                  'radial-gradient(circle at 40% 60%, #ffffcc, transparent 50%)' : 
                  'white'



                return (
                  <div style={{background: color}} className={'text-xs sm:text-sm border border-solid p-3 flex items-center justify-between rounded-lg ' + (isToday ? ' border-indigo-500': ' ' )} key={dayOfWeekIndex}>
                    {dayIndex}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
    
  )
}
