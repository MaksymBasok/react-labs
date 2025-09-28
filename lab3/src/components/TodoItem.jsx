import { useState } from "react";
import styles from "../styles/TodoItem.module.css";

const TodoItem = ({ task, onDelete, ...props }) => {
  const [completed, setCompleted] = useState(false);

  return (
    <li className={`${styles.item} ${completed ? styles.done : ""}`} {...props}>
      <label className={styles.left}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => setCompleted((v) => !v)}
        />
        <span className={styles.text}>{task.text}</span>
      </label>
      <button
        className={`${styles.icon} ${styles.danger}`}
        onClick={() => onDelete(task.id)}
        aria-label="Delete"
      >
        🗑️
      </button>
    </li>
  );
};

export default TodoItem;
