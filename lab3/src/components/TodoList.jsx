import { useState } from "react";
import AddTodoForm from "./AddTodoForm.jsx";
import TodoItem from "./TodoItem.jsx";
import styles from "../styles/TodoList.module.css";

const TodoList = ({ initial = [], ...props }) => {
  const [todos, setTodos] = useState(initial);

  const addTodo = (t) => setTodos((list) => [t, ...list]);
  const deleteTodo = (id) => setTodos((list) => list.filter((x) => x.id !== id));

  return (
    <section className={styles.card} {...props}>
      <h2 className={styles.title}>React To-Do</h2>
      <AddTodoForm onAddTodo={addTodo} />
      <ul className={styles.list}>
        {todos.map((t) => (
          <TodoItem key={t.id} task={t} onDelete={deleteTodo} />
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
