import { useState, useEffect } from "react";
import "../css/ExpenseForm.css";

const initialexpense = {
  description: "",
  category: "",
  amount: "",
  date: "",
};

export default function ExpenseForm({ editingExpense, onSubmit }) {
  const [expense, setExpense] = useState(initialexpense);

  useEffect(() => {
    if (editingExpense) {
      setExpense(editingExpense);
    } else {
      setExpense(initialexpense);
    }
  }, [editingExpense]);

  const handleChange = (field) => (e) => {
    setExpense({ ...expense, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(expense);
    setExpense(initialexpense);
  };

  return (
    <div className="expense-form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Description"
          value={expense.description}
          onChange={handleChange("description")}
        />
        <select
          required
          value={expense.category}
          onChange={handleChange("category")}
        >
          <option value="" disabled>
            Category
          </option>
          <option value="food">food</option>
          <option value="transportation">transportation</option>
          <option value="entertainment">entertainment</option>
          <option value="utilities">utilities</option>
          <option value="other">other</option>
        </select>
        <input
          type="number"
          required
          placeholder="Amount"
          value={expense.amount}
          onChange={handleChange("amount")}
          step="0.01"
          min="0"
        />
        <input
          type="date"
          required
          value={expense.date}
          onChange={handleChange("date")}
        />
        <button type="submit">
          {editingExpense ? "Update" : "Add Expense"}
        </button>
      </form>
    </div>
  );
}