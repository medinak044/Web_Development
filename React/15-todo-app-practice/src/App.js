import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const fakeTodoList = [
    { id: Date.now(), description: 'a', isComplete: false },
    { id: Date.now(), description: 'b', isComplete: false },
    { id: Date.now(), description: 'c', isComplete: false },
  ]

  const [todos, setTodos] = useState([...fakeTodoList])
  const [newTodo, setNewTodo] = useState('')

  const handleChange = e => { setNewTodo(e.target.value) } // Every time user types, record the change


  const handleSubmit = e => {
    e.preventDefault()

  }

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
        <input type="text" />
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
