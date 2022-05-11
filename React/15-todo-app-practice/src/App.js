import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const fakeTodoList = [
    { id: Date.now(), description: 'a', isComplete: false },
    { id: Date.now(), description: 'b', isComplete: false },
    { id: Date.now(), description: 'c', isComplete: false },
  ]

  const [todos, setTodos] = useState([])
  const [newTodoDescription, setNewTodoDescription] = useState('')

  const handleChange = e => { setNewTodoDescription(e.target.value) } // Every time user types, record the change


  const handleSubmit = e => {
    e.preventDefault()
    let newTodo = {
      id: Date.now(),
      description: newTodoDescription,
      isComplete: false
    }
    const newTodos = [...todos, newTodo] // Add at end of array
    setTodos(newTodos)
    setNewTodoDescription('')
  }

  useEffect(() => {
    // Retrieve todos from database when page first loads
    // setTodos([...fakeTodoList])
    fetch('http://localhost:8000/todos') // Next time use Axios for practice
      .then(res => {
        return res.json() // Waits for the data to be retrieved, then parsed
      })
      .then(data => {
        // console.log(data)
        setTodos(data)
      })
  }, [])

  const todoList = todos.map(todo => {
    return (
      <div>
        <li id={todo.id}>{todo.description}</li>
      </div>
    )
  })

  return (
    <div className="App">
      <h1>Todo list</h1>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" />
        <button>Submit</button>
      </form>
      <div>
        <ol>
          {todoList}
        </ol>
      </div>
    </div>
  );
}

export default App;
