import { useState } from "react"


const initialexpense = {
    description: "",
    category: "",
    amount:"",
    date: "",
}
export default function ExpenseForm({isEditing, onAdd}) {
const [expense, setExpense] = useState(() =>{
    return initialexpense
})


    return (
        <div>
            <form onSubmit={(e)=> {
                e.preventDefault()
                console.log(expense)
                
                
                if(isEditing){
                    onAdd(isEditing,expense)
                }
                else{
                    onAdd(expense)
                }
                setExpense(initialexpense)
                // in this  function  it will store all the values from the form  and then  store to the initalexpense 
            }}>
                <input type="text" required  placeholder="enter expense description" value={expense.description} onChange={(e) => setExpense({...expense, description: e.target.value})}></input>
                <select required value={expense.category} onChange={(e) => setExpense({...expense, category: e.target.value})}>
                    {}
                    <option value="" disabled>select category</option>
                    <option value="food">food</option>
                    <option value="transportation">transportation</option>
                    <option value="entertainment">entertainment</option>
                    <option value="utilities">utilities</option>
                    <option value="other">other</option>
                </select>
                <input type="text" required placeholder="enter ammount" value={expense.amount} onChange={(e)=> setExpense({...expense,amount:e.target.value})}></input>
                <input type="date" required placeholder="enter date " value={expense.date} onChange={(e) => setExpense({...expense,date:e.target.value})}></input>
                <button type="submit" >add expense</button>
            </form>
        </div>
    )
}