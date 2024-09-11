import React from 'react';

export default function HabitChecklist({ habits, onCheck }) {
  return (
    <div className="habit-checklist">
      <h2>Today's Habits</h2>
      <ul>
        {habits.map((habit, index) => (
          <li key={index}>
            <button
              className={'p-4 rounded-lg blueShadow bg-blue-500 text-white ' + (habit.completed ? 'bg-gray-300' : '')}
              onClick={() => !habit.completed && onCheck(index)}
              disabled={habit.completed}
            >
              {habit.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

