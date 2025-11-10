import React, { useCallback } from 'react';
import styles from '../styles/TodoItem.module.css';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  console.log(`Render: TodoItem ${todo.text}`);

  const handleToggle = useCallback(() => toggleTodo(todo.id), [toggleTodo, todo.id]);
  const handleDelete = useCallback(
    (e) => {
      e.stopPropagation();
      deleteTodo(todo.id);
    },
    [deleteTodo, todo.id]
  );

  return (
    <li
      className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}
      onClick={handleToggle}
    >
      <span className={styles.text}>{todo.text}</span>
      <button className={styles.deleteBtn} onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

export default React.memo(TodoItem);
