import styles from "../styles/TodoFilters.module.css";

const modes = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
];

const TodoFilters = ({ mode, onModeChange, query, onQueryChange }) => (
  <div className={styles.row}>
    <div className={styles.modes}>
      {modes.map(m => (
        <button
          key={m.id}
          className={`${styles.tab} ${mode === m.id ? styles.active : ""}`}
          onClick={() => onModeChange(m.id)}
          type="button"
        >
          {m.label}
        </button>
      ))}
    </div>
    <input
      className={styles.search}
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      placeholder="Search…"
    />
  </div>
);
export default TodoFilters;
