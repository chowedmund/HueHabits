import React from 'react'

export default function Button(props) {
  const { text, onClick } = props;
  return (
    <button className="bg-blue-500 text-white rounded px-4 py-2 text-white hover:bg-blue-700 rounded-full focus:outline-none focus:shadow-outline" onClick={onClick}>
      {text}
    </button>
  )
}
