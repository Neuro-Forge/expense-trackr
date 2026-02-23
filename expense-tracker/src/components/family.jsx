import React from 'react';
import { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import '../css/family.css';

export default function Family({ expenses, onAddExpense }) {
  const [familyData, setFamilyData] = useLocalStorage('familyData', {
    name: '',
    monthlyFund: 0,
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(familyData.name);
  const [tempFund, setTempFund] = useState(familyData.monthlyFund);

  // Get current month
  const currentMonth = new Date().toISOString().slice(0, 7);
  
  // Filter family expenses for current month
  const familyExpenses = expenses.filter(e => 
    e.isFamily && e.date && e.date.startsWith(currentMonth)
  );
  
  // Calculate total expenses for current month
  const totalExpenses = familyExpenses.reduce(
    (sum, e) => sum + parseFloat(e.amount || 0),
    0
  );
  
  // Calculate remaining budget
  const remainingBudget = familyData.monthlyFund - totalExpenses;

  const handleSave = () => {
    setFamilyData({
      ...familyData,
      name: tempName,
      monthlyFund: parseFloat(tempFund) || 0,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempName(familyData.name);
    setTempFund(familyData.monthlyFund);
    setIsEditing(false);
  };

  // If no family created yet, show setup form
  if (!familyData.name && !isEditing) {
    return (
      <div className="family-container">
        <div className="family-setup">
          <h2>Welcome to Family Expense Tracker!</h2>
          <p>Set up your family to start tracking expenses together.</p>
          
          <div className="setup-form">
            <label>
              Family Name:
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Enter family name"
              />
            </label>
            
            <label>
              Monthly Budget:
              <input
                type="number"
                value={tempFund}
                onChange={(e) => setTempFund(e.target.value)}
                placeholder="Enter monthly budget"
                min="0"
                step="0.01"
              />
            </label>
            
            <button className="btn-primary" onClick={handleSave}>
              Create Family
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="family-container">
      {/* Family Header */}
      <div className="family-header">
        <div className="family-info">
          <h2> {familyData.name}</h2>
          <button 
            className="btn-edit-family"
            onClick={() => setIsEditing(true)}
          >
            Edit Family
          </button>
        </div>
        
        {/* Budget Summary */}
        <div className="budget-summary">
          <div className="budget-card">
            <h3>Monthly Budget</h3>
            <p className="amount">{familyData.monthlyFund.toFixed(2)}</p>
          </div>
          <div className="budget-card expenses">
            <h3>Total Expenses</h3>
            <p className="amount">{totalExpenses.toFixed(2)}</p>
          </div>
          <div className={`budget-card remaining ${remainingBudget < 0 ? 'negative' : ''}`}>
            <h3>Remaining</h3>
            <p className="amount">{remainingBudget.toFixed(2)}</p>
          </div>
        </div>
        
        {/* Budget Progress Bar */}
        <div className="budget-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${Math.min((totalExpenses / familyData.monthlyFund) * 100, 100)}%`,
                backgroundColor: remainingBudget < 0 ? '#e74c3c' : '#27ae60'
              }}
            />
          </div>
          <p className="progress-text">
            {((totalExpenses / familyData.monthlyFund) * 100).toFixed(1)}% used
          </p>
        </div>
      </div>

      {/* Edit Family Form */}
      {isEditing && (
        <div className="family-edit-form">
          <h3>Edit Family Details</h3>
          <div className="form-row">
            <label>
              Family Name:
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
              />
            </label>
            <label>
              Monthly Budget:
              <input
                type="number"
                value={tempFund}
                onChange={(e) => setTempFund(e.target.value)}
                min="0"
                step="0.01"
              />
            </label>
          </div>
          <div className="form-actions">
            <button className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Family Expenses List */}
      <div className="family-expenses">
        <h3>This Month's Expenses ({currentMonth})</h3>
        
        {familyExpenses.length === 0 ? (
          <p className="no-expenses">No expenses this month. Add an expense to get started!</p>
        ) : (
          <table className="expense-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Bill</th>
              </tr>
            </thead>
            <tbody>
              {familyExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.description}</td>
                  <td className="category-cell">{expense.category}</td>
                  <td className="date-cell">{expense.date}</td>
                  <td className="amount-cell">${parseFloat(expense.amount || 0).toFixed(2)}</td>
                  <td>
                    {expense.billDataUrl ? (
                      <a
                        href={expense.billDataUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bill-link"
                      >
                        View Bill
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
