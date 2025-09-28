import { useState } from "react";
import styles from "../styles/AddTodoForm.module.css";

const AddTodoForm = ({ onAddTodo, ...props }) => {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    onAddTodo({ id: crypto.randomUUID(), text: value });
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
      <button className={styles.btn} type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
