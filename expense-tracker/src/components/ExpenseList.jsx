import "../css/ExpenseList.css";

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  return (
    <div className="expense-list-container">
      {expenses.length === 0 ? (
        <p>No expenses</p>
      ) : (
        <ul>
          {expenses.map((e) => (
            <li key={e.id} className="expense-item">
              <div className="expense-info">
                <strong>{e.description}</strong> &mdash; {e.category} &mdash; $
                {parseFloat(e.amount).toFixed(2)} &mdash; {e.date}
              </div>
              <div className="expense-actions">
                <button onClick={() => onEdit(e)}>Edit</button>
                <button className="delete" onClick={() => onDelete(e.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}