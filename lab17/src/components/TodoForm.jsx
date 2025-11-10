import React, { useState, useCallback } from 'react';
import styles from '../styles/TodoForm.module.css';

function TodoForm({ addTodo }) {
  console.log('Render: TodoForm');
  const [text, setText] = useState('');

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (text.trim()) {
        addTodo(text);
        setText('');
      }
    },
    [text, addTodo]
  );

  return (
    <form className={styles.todoForm} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Add a new todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className={styles.button} type="submit">
        Add
      </button>
    </form>
  );
}

export default React.memo(TodoForm);
