import s from "../styles/Controls.module.css";

export default function BookSearch({ value, onChange }) {
  return (
    <input
      className={s.search}
      placeholder="Search by id, name or phone…"
      value={value}
      onChange={(e)=>onChange(e.target.value)}
    />
  );
}
