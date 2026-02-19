import { useState } from 'react'
import ExpenseForm  from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import useLocalStorage from './hooks/UseLocalStorage'

function App() {
  const [expenses, setExpenses] = useLocalStorage("expenses", [])
  function onUpdate(expense) {
    // TODO: implement update logic
  }

  function onEdit(id){

  }
function onAdd(expense) {
  setExpenses((prev) => {
    return [...prev, { ...expense, id: Date.now() }];
  });
}

  return (
    <div>
      <ExpenseForm onAdd={onAdd} />
      <ExpenseList
        expenses={expenses}
        onUpdate={onUpdate}
        onEdit={onEdit}
      />
    </div>
  );
}

export default App
