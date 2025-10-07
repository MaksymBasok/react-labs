import styles from "../styles/App.module.css";

const TodoApp = ({ children }) => (
  <main className={styles.wrap}>
    <div className={styles.card}>{children}</div>
  </main>
);

export default TodoApp;
