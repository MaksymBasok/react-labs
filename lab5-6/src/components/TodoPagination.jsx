import styles from "../styles/TodoPagination.module.css";

const TodoPagination = ({ page, totalPages, totalItems, limit, onPrev, onNext, onLimitChange, ...props }) => (
  <div className={styles.bar} {...props}>
    <div className={styles.left}>
      <button className={styles.button} onClick={onPrev} disabled={page <= 1}>Previous</button>
      <span className={styles.badge}>Page {page} / {totalPages}</span>
      <button className={styles.button} onClick={onNext} disabled={page >= totalPages}>Next</button>
    </div>

    <div className={styles.right}>
      <label>
        per page:
        <select className={styles.select} value={limit} onChange={(e) => onLimitChange(Number(e.target.value))}>
          {[5, 10, 20].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </label>
      <span className={styles.badge}>{totalItems} items</span>
    </div>
  </div>
);

export default TodoPagination;
