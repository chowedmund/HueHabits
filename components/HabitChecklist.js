import React from 'react';

export default function HabitChecklist({ habits, onCheck }) {
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
                checked={habit.completed}
                onChange={() => onCheck(index)}
              />
              <span className="text-lg text-gray-700">{habit.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

