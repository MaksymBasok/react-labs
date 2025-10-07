import styles from "../styles/TodoStatus.module.css";

const TodoStatus = ({ isLoading, error, empty }) => {
  if (isLoading) return <p className={styles.muted}>Loading…</p>;
  if (error)     return <p className={styles.error}>Error: {String(error)}</p>;
  if (empty)     return <p className={styles.muted}>No tasks</p>;
  return null;
};

export default TodoStatus;
