import React from 'react';
import './calendar.css'; // Import the CSS file for the multicolor effect

export default function Calendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the current month
  const multicolorDays = [5, 10, 15, 20, 25]; // Example days with multicolor effect

  return (
    <div className="calendar h-full">
      {Array.from({ length: daysInMonth }, (_, i) => (
        <div key={i} className={`day ${multicolorDays.includes(i + 1) ? 'multicolor' : ''}`}>
          {i + 1}
        </div>
      ))}
    </div>
  );
}
