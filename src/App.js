import React, { useState } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editIndex, setEditIndex] = useState(-1); 

  // Function to generate a random color
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const addTask = () => {
    if (task.trim()) {
      const newTask = { text: task, completed: false, color: generateRandomColor() }; // Add color to task
      if (editIndex >= 0) {
        const updatedTasks = tasks.map((t, index) => (index === editIndex ? newTask : t));
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        setTasks([...tasks, newTask]);
      }
      setTask('');
    }
  };

  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-container">
      <h1>WHAT I NEED TO DO?</h1>
      
      <div className="input-section">
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Add new..." 
          className="task-input"
        />
    
        <button 
          onClick={addTask} 
          className="add-task-button" 
          disabled={!task}
        >
          {editIndex >= 0 ? 'Update' : 'ADD'}
        </button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''} style={{ backgroundColor: task.color }}> {/* Apply color */}
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => toggleComplete(index)} 
            />
            <span className="task-text">{task.text}</span>
            <button onClick={() => editTask(index)} className="edit-btn">✎</button>
            <button onClick={() => removeTask(index)} className="delete-btn">
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
