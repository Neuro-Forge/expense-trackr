export default function ExpenseList({ expenses, onUpdate, onEdit }) {
    return(
        <div>
            {expenses.length === 0 ? (
                <p>No expenses</p>
            ) : (
                <ul>
                    {
                        expenses.map((e) => {
                            return <li key={e.id}>
                                {e.description} {e.category} {e.amount} {e.date}
                                <button onClick={() => onUpdate(e)}>udate</button>
                                <button onClick={() => onEdit(e)}> edit</button>
                            </li>
                        })
                    }
                </ul>
            )}
        </div>
    )
}