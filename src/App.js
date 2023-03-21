import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue) return;
    setTodos([...todos, { id: Date.now(), name: inputValue, completed: false }]);
    setInputValue('');
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id, newName) => {
    if (!newName) { 
      return
    }
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          name: newName,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleCheckboxChange = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const renderTodoItem = (todo) => (
    <li key={todo.id}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleCheckboxChange(todo.id)}
      />
      <span className={todo.completed ? 'completed' : ''}>{todo.name}</span>
      <button className="edit-btn" onClick={() => handleEdit(todo.id, prompt('New name:', todo.name))}>
        Edit
      </button>
      <button className="delete-btn" onClick={() => handleDelete(todo.id)}>Delete</button>
    </li>
  );

  const completedTodos = todos.filter((todo) => todo.completed);
  const incompleteTodos = todos.filter((todo) => !todo.completed);

  return (
    <div className="app-container">
      <h1 className="app-heading">StRider To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} className="input-field" />
        <button type="submit" className="add-btn">Add Task</button>
      </form>
      <ul className="todo-list">
        {incompleteTodos.map((todo) => renderTodoItem(todo))}
      </ul>
      {completedTodos.length > 0 && (
        <>
          <h2 className="completed-heading">Completed</h2>
          <ul className="completed-list">
            {completedTodos.map((todo) => renderTodoItem(todo))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
