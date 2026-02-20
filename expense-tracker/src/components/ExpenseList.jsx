// src/components/ExpenseList.jsx
import React from 'react';
import '../css/ExpenseList.css';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  if (!expenses.length) {
    return <p className="empty-list">No expenses yet.</p>;
  }

  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Family</th>
          <th>Bill</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((e) => (
          <tr key={e.id}>
            <td>{e.name}</td>
            <td className="category-cell">{e.category}</td>
            <td className="date-cell">{e.date}</td>
            <td className="amount-cell">{parseFloat(e.amount || 0).toFixed(2)}</td>
            <td>
              {e.isFamily && <span className="family-tag">Family</span>}
            </td>
            <td>
              {e.billDataUrl ? (
                <a
                  href={e.billDataUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bill-link"
                >
                  View bill
                </a>
              ) : (
                '-'
              )}
            </td>
            <td className="actions-cell">
              <button
                type="button"
                className="btn-edit"
                onClick={() => onEdit(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn-delete"
                onClick={() => onDelete(e.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseList;
