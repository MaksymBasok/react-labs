import TodoList from "./TodoList.jsx";
import styles from "../styles/TodoApp.module.css";

const TodoApp = () => (
  <section className={styles.card}>
    <h1 className={styles.title}>React To-Do</h1>
    <TodoList />
  </section>
);
export default TodoApp;
