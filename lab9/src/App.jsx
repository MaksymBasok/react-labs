import s from "./styles/App.module.css";
import AddressBook from "./components/AddressBook.jsx";

export default function App() {
  return (
    <main className={s.wrap}>
      <div className={s.card}>
        <AddressBook />
      </div>
    </main>
  );
}
