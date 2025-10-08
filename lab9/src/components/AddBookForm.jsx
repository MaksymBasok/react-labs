import { useState } from "react";
import s from "../styles/Form.module.css";

export default function AddBookForm({ onAdd }) {
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState({});

  const errs = {
    firstName: !firstName.trim() ? "The first name is required" : "",
    lastName:  !lastName.trim()  ? "The last name is required"  : "",
    phone:     !phone.trim()     ? "The phone is required"      : "",
  };
  const invalid = Object.values(errs).some(Boolean);
  const show = (k) => touched[k] && errs[k];

  const submit = (e) => {
    e.preventDefault();
    setTouched({ firstName: true, lastName: true, phone: true });
    if (invalid) return;
    onAdd({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
    });
    setFirst(""); setLast(""); setPhone(""); setTouched({});
  };

  return (
    <form onSubmit={submit} className={s.box}>
      <div className={s.row}>
        <label className={s.label}>First Name*</label>
        <input className={s.input}
               value={firstName}
               onBlur={() => setTouched(t => ({...t, firstName:true}))}
               onChange={(e)=>setFirst(e.target.value)} />
        {show("firstName") && <div className={s.error}>{errs.firstName}</div>}

        <label className={s.label}>Last Name*</label>
        <input className={s.input}
               value={lastName}
               onBlur={() => setTouched(t => ({...t, lastName:true}))}
               onChange={(e)=>setLast(e.target.value)} />
        {show("lastName") && <div className={s.error}>{errs.lastName}</div>}

        <label className={s.label}>Phone*</label>
        <input className={s.input}
               value={phone}
               onBlur={() => setTouched(t => ({...t, phone:true}))}
               onChange={(e)=>setPhone(e.target.value)} />
        {show("phone") && <div className={s.error}>{errs.phone}</div>}

        <button className={s.btn} type="submit">Add</button>
      </div>
    </form>
  );
}
