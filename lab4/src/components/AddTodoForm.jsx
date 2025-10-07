import { useState } from "react";
import styles from "../styles/AddTodoForm.module.css";

const AddTodoForm = ({ onAdd, pending, ...props }) => {
  const [text, setText] = useState("");
  const submit = (e) => {
    e.preventDefault();
    const v = text.trim();
    if (!v) return;
    onAdd(v);
    setText("");
  };
  return (
    <form onSubmit={submit} className={styles.row} {...props}>
      <input
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task…"
      />
      <button className={styles.btn} type="submit" disabled={pending}>Add</button>
    </form>
  );
};
export default AddTodoForm;
