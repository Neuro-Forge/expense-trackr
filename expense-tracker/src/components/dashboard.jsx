import React, { useMemo } from 'react';
import '../css/dashboard.css';

const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const startOfWeek = (d) => {
  const x = startOfDay(d);
  const day = x.getDay();
  x.setDate(x.getDate() - day);
  return x;
};

const startOfMonth = (d) => {
  const x = startOfDay(d);
  x.setDate(1);
  return x;
};

const Dashboard = ({ expenses }) => {
  const now = new Date();

  const stats = useMemo(() => {
    const sDay = startOfDay(now);
    const sWeek = startOfWeek(now);
    const sMonth = startOfMonth(now);

    let daily = 0;
    let weekly = 0;
    let monthly = 0;
    let family = 0;
    const byCategory = {};

    expenses.forEach((e) => {
      const amount = parseFloat(e.amount || 0);
      if (!amount || !e.date) return;

      const d = new Date(e.date);

      if (d >= sMonth && d <= now) monthly += amount;
      if (d >= sWeek && d <= now) weekly += amount;
      if (d >= sDay && d <= now) daily += amount;
      if (e.isFamily) family += amount;

      const cat = e.category || 'other';
      byCategory[cat] = (byCategory[cat] || 0) + amount;
    });

    const maxCat =
      Object.values(byCategory).reduce((m, v) => Math.max(m, v), 0) || 1;

    return { daily, weekly, monthly, family, byCategory, maxCat };
  }, [expenses, now]);

  return (
    <section className="dashboard">
      <h2>Overview</h2>
      <div className="dashboard-grid">
        <div className="stat-card">
          <span>Today</span>
          <strong>${stats.daily.toFixed(2)}</strong>
        </div>
        <div className="stat-card">
          <span>This week</span>
          <strong>${stats.weekly.toFixed(2)}</strong>
        </div>
        <div className="stat-card">
          <span>This month</span>
          <strong>${stats.monthly.toFixed(2)}</strong>
        </div>
        <div className="stat-card">
          <span>Family total</span>
          <strong>${stats.family.toFixed(2)}</strong>
        </div>
      </div>

      <div className="chart-card">
        <h3>Spending by category (this month)</h3>
        <div className="bar-chart">
          {Object.entries(stats.byCategory).map(([cat, value]) => {
            const width = (value / stats.maxCat) * 100;
            return (
              <div key={cat} className="bar-row">
                <span className="bar-label">{cat}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${width}%` }}
                  />
                </div>
                <span className="bar-value">${value.toFixed(2)}</span>
              </div>
            );
          })}
          {Object.keys(stats.byCategory).length === 0 && (
            <p className="empty-chart">Add expenses to see the chart</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
