// src/components/MonthlyCalendar.jsx
import React, { useMemo } from 'react';
import '../css/MonthlyCalendar.css';

const getMonthDays = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];

  // Start week on Monday
  const startWeekday = (firstDay.getDay() + 6) % 7; // Sunday=0 -> 6
  for (let i = 0; i < startWeekday; i += 1) {
    days.push(null);
  }

  for (let d = 1; d <= lastDay.getDate(); d += 1) {
    days.push(new Date(year, month, d));
  }

  return days;
};

const MonthlyCalendar = ({ expenses }) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const { days, dayTotals } = useMemo(() => {
    const days = getMonthDays(year, month);
    const dayTotals = {};

    expenses.forEach((e) => {
      if (!e.date) return;
      const d = new Date(e.date);
      if (d.getFullYear() !== year || d.getMonth() !== month) return;

      const key = d.getDate(); // 1–31
      const amount = parseFloat(e.amount || 0);
      if (!amount) return;

      dayTotals[key] = (dayTotals[key] || 0) + amount;
    });

    return { days, dayTotals };
  }, [expenses, year, month]);

  const monthLabel = now.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className="month-calendar">
      <div className="month-calendar-header">
        <h3>{monthLabel}</h3>
        <div className="calendar-legend">
          <span className="legend-item">
            <span className="legend-box legend-low" />
            ≤ 1000
          </span>
          <span className="legend-item">
            <span className="legend-box legend-high" />
            &gt; 1000
          </span>
        </div>
      </div>

      <div className="calendar-grid">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((w) => (
          <div key={w} className="calendar-weekday">
            {w}
          </div>
        ))}

        {days.map((d, idx) => {
          if (!d) {
            return <div key={`blank-${idx}`} className="calendar-day blank" />;
          }

          const dayNumber = d.getDate();
          const total = dayTotals[dayNumber] || 0;
          let state = 'empty';
          if (total > 0 && total <= 1000) state = 'low';
          if (total > 1000) state = 'high';

          return (
            <div
              key={dayNumber + '-' + idx}
              className={`calendar-day ${state}`}
              title={total ? `Total: ${total.toFixed(2)}` : 'No expenses'}
            >
              <span className="day-number">{dayNumber}</span>
              {total > 0 && (
                <span className="day-total">{total.toFixed(0)}</span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MonthlyCalendar;
