import React, { useState, useCallback, useMemo } from 'react';
import { useTodos } from './hooks/useTodos';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import SearchBar from './components/SearchBar';
import styles from './styles/App.module.css';

function App() {
  const { todos, isLoading, error, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const visibleTodos = useMemo(() => {
    console.log('Filtering...');
    return todos.filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [todos, searchTerm]);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1 className={styles.title}>Optimize React</h1>

        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <TodoForm addTodo={addTodo} />

        {isLoading && <p style={{ textAlign: 'center' }}>Loading todos...</p>}
        {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

        {!isLoading && !error && (
          <TodoList
            todos={visibleTodos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
