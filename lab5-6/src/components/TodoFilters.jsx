import styles from "../styles/TodoFilters.module.css";

const modes = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
];

const TodoFilters = ({ search, mode, onSearchChange, onModeChange, ...props }) => (
  <div className={styles.row} {...props}>
    <div className={styles.tabs}>
      {modes.map(m => (
        <button
          key={m.id}
          type="button"
          className={`${styles.tab} ${mode === m.id ? styles.active : ""}`}
          onClick={() => onModeChange(m.id)}
        >
          {m.label}
        </button>
      ))}
    </div>

    <input
      className={styles.input}
      placeholder="Search by title…"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  </div>
);

export default TodoFilters;
