import styles from "../styles/TodoSummary.module.css";

const TodoSummary = ({ total, visible, completed, onResetSearch }) => (
  <div className={styles.bar}>
    <div className={styles.stats}>
      <span>Total: <b>{total}</b></span>
      <span>Visible: <b>{visible}</b></span>
      <span>Completed: <b>{completed}</b></span>
    </div>
    <button className={styles.reset} type="button" onClick={onResetSearch}>
      Reset filters
    </button>
  </div>
);
export default TodoSummary;
