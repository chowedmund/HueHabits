import React from 'react'

export default function Button(props) {
  const { text, dark, onClick } = props
  return (
    <button
      className={
        'rounded rounded-full px-4 py-2 focus:outline-none focus:shadow-outline ' +
        (dark
          ? 'bg-blue-500 text-white hover:bg-blue-700'
          : 'border border-blue-500 text-blue-500 hover:bg-blue-700 hover:text-white')
      }
      onClick={onClick}
    >
      {text}
    </button>
  )
}