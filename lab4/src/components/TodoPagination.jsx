import styles from "../styles/TodoPagination.module.css";

const range = (n) => Array.from({ length: n }, (_, i) => i + 1);

const TodoPagination = ({ page, totalPages, onChange, pageSize, onPageSizeChange }) => (
  <div className={styles.row}>
    <div className={styles.pages}>
      {range(totalPages).map(p => (
        <button
          key={p}
          className={`${styles.btn} ${p === page ? styles.active : ""}`}
          onClick={() => onChange(p)}
          type="button"
        >
          {p}
        </button>
      ))}
    </div>
    <select
      className={styles.select}
      value={pageSize}
      onChange={(e) => onPageSizeChange(Number(e.target.value))}
    >
      {[5, 10, 20].map(s => <option key={s} value={s}>{s}/page</option>)}
    </select>
  </div>
);
export default TodoPagination;
