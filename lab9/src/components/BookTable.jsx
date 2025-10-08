import t from "../styles/Table.module.css";
import EmptyState from "./EmptyState.jsx";
import BookRow from "./BookRow.jsx";

export default function BookTable({ items, onUpdate, onDelete }) {
  if (!items.length) {
    return <div className={t.tableWrap}><EmptyState /></div>;
  }
  return (
    <div className={t.tableWrap}>
      <table className={t.table}>
        <thead>
          <tr>
            <th>id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th style={{textAlign:"right"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(b => (
            <BookRow key={b.id} book={b} onUpdate={onUpdate} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
