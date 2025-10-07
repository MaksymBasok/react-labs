import { useEffect, useState } from "react";
import styles from "../styles/TodoItem.module.css";

const TodoItem = ({ task, onToggle, onDelete, ...props }) => {
  const [completed, setCompleted] = useState(!!task.completed);
  useEffect(() => { setCompleted(!!task.completed); }, [task.completed]);

  const toggle = () => {
    setCompleted(v => !v);
    onToggle(task.cid);
  };

  return (
    <li className={`${styles.item} ${completed ? styles.done : ""}`} {...props}>
      <label className={styles.left}>
        <input type="checkbox" checked={completed} onChange={toggle} />
        <span className={styles.text}>{task.todo}</span>
      </label>
      <button className={`${styles.icon} ${styles.danger}`} onClick={() => onDelete(task.cid)} aria-label="Delete">🗑️</button>
    </li>
  );
};
export default TodoItem;
