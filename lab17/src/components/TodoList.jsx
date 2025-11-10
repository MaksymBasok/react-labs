import React, { useMemo } from 'react';
import TodoItem from './TodoItem';
import styles from '../styles/TodoList.module.css';

function TodoList({ todos, toggleTodo, deleteTodo }) {
  console.log('Render: TodoList');

  const todoItems = useMemo(
    () =>
      todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      )),
    [todos, toggleTodo, deleteTodo]
  );

  if (!todos.length) {
    return <p className={styles.empty}>No todos yet...</p>;
  }

  return <ul className={styles.todoList}>{todoItems}</ul>;
}

export default React.memo(TodoList);
