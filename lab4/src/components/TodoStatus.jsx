import styles from "../styles/TodoStatus.module.css";

const TodoStatus = ({ isLoading, error, isEmpty }) => {
  if (isLoading) return <p className={styles.loading}>Loading…</p>;
  if (error) return <p className={styles.error}>Error: {String(error)}</p>;
  if (isEmpty) return <p className={styles.empty}>Nothing here yet</p>;
  return null;
};
export default TodoStatus;
