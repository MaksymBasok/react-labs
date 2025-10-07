import { useEffect, useState } from "react";
import styles from "../styles/TodoItem.module.css";

const TodoItem = ({ task, onToggle, onEdit, onDelete, ...props }) => {
  const [completed, setCompleted] = useState(!!task.completed);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.todo);

  useEffect(() => { setCompleted(!!task.completed); }, [task.completed]);
  useEffect(() => { setText(task.todo); }, [task.todo]);

  const toggle = () => {
    const next = !completed;
    setCompleted(next);
    onToggle(task.id, next);
  };

  const save = () => {
    const v = text.trim();
    if (!v || v === task.todo) { setEditing(false); return; }
    onEdit(task.id, v);
    setEditing(false);
  };

  return (
    <li className={`${styles.item} ${completed ? styles.done : ""}`} {...props}>
      <label className={styles.left}>
        <input type="checkbox" checked={completed} onChange={toggle} />
        {editing ? (
          <input
            className={styles.input}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && save()}
            autoFocus
          />
        ) : (
          <span className={styles.text}>{text}</span>
        )}
      </label>

      <div className={styles.actions}>
        {editing ? (
          <button className={styles.primary} onClick={save}>Save</button>
        ) : (
          <button className={styles.ghost} onClick={() => setEditing(true)}>Edit</button>
        )}
        <button className={styles.danger} onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
