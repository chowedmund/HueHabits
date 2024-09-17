import React from 'react'

export default function HabitChecklist({allHabitsCompleted, habits, onCheck, onAddHabit, onDeleteHabit}) {
  const [ newHabit, setNewHabit ] = React.useState('')

  const handleAddHabit = () => {
    if (newHabit.trim() !== '' && habits.length < 3) {
      onAddHabit(newHabit)
      setNewHabit('')
    }
  }

  console.log('habits in checklist', habits)
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl text-center text-gray-800 mb-4">Today&apos;s Habits</h2>
      <ul className="list-none p-0">
        {habits.map((habit, index) => (
          <li key={index} className="flex items-center py-2">
            <label className="flex items-center w-full">
              <input
                type="checkbox"
                className="mr-3 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={habit.completed || allHabitsCompleted}
                onChange={() => onCheck(index)}
                disabled={allHabitsCompleted}
              />
              <span className="text-lg text-gray-700 flex-1">{habit.name}</span>
              <button className='ml-3 text-red-500' onClick={() => onDeleteHabit(index)}>Delete</button>
            </label>
          </li>
        ))}
      </ul>
      {habits.length < 3 && (
        <div className="mt-4 flex">
          <input 
            type="text" 
            className="flex=1 p-2 border border-gray-300 rounded"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Add a new habit"
          />
          <button
            className="ml-2 p-2 bg-blue-500 text-white rounded"
            onClick={handleAddHabit}
          >
            Add
          </button>
        </div>
      )}
    </div>
  )
}

