import { useState } from "react";
import t from "../styles/Table.module.css";

export default function BookRow({ book, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    firstName: book.firstName,
    lastName: book.lastName,
    phone: book.phone,
  });

  const save = () => {
    const f = draft.firstName.trim();
    const l = draft.lastName.trim();
    const p = draft.phone.trim();
    if (!f || !l || !p) return;
    onUpdate(book.id, { firstName: f, lastName: l, phone: p });
    setEditing(false);
  };

  const cancel = () => {
    setEditing(false);
    setDraft({ firstName: book.firstName, lastName: book.lastName, phone: book.phone });
  };

  return (
    <tr>
      <td><span className={t.badge}>{book.id}</span></td>

      <td>{editing
        ? <input className={t.inlineInput} value={draft.firstName}
                 onChange={(e)=>setDraft(d=>({...d, firstName:e.target.value}))}/>
        : book.firstName}</td>

      <td>{editing
        ? <input className={t.inlineInput} value={draft.lastName}
                 onChange={(e)=>setDraft(d=>({...d, lastName:e.target.value}))}/>
        : book.lastName}</td>

      <td>{editing
        ? <input className={t.inlineInput} value={draft.phone}
                 onChange={(e)=>setDraft(d=>({...d, phone:e.target.value}))}/>
        : book.phone}</td>

      <td className={t.rowActions}>
        {editing ? (
          <>
            <button className={t.icon} onClick={save}>Save</button>
            <button className={t.icon} onClick={cancel}>Cancel</button>
          </>
        ) : (
          <>
            <button className={t.icon} onClick={()=>setEditing(true)}>Edit</button>
            <button className={`${t.icon} ${t.danger}`} onClick={()=>onDelete(book.id)}>Delete</button>
          </>
        )}
      </td>
    </tr>
  );
}
