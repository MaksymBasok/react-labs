import { useMemo, useState } from "react";
import AddBookForm from "./AddBookForm.jsx";
import BookSearch from "./BookSearch.jsx";
import BookTable from "./BookTable.jsx";

export default function AddressBook() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;
    return books.filter(b =>
      b.firstName.toLowerCase().includes(q) ||
      b.lastName.toLowerCase().includes(q) ||
      b.phone.toLowerCase().includes(q) ||
      String(b.id).toLowerCase().includes(q)
    );
  }, [books, query]);

  const add = ({ firstName, lastName, phone }) => {
    setBooks(list => [
      { id: crypto.randomUUID(), firstName, lastName, phone },
      ...list,
    ]);
  };

  const update = (id, patch) => {
    setBooks(list =>
      list.map(b => (b.id === id ? { ...b, ...patch } : b))
    );
  };

  const remove = (id) => {
    setBooks(list => list.filter(b => b.id !== id));
  };

  return (
    <>
      <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:16}}>
        <h2 style={{margin:0}}>Address Book</h2>
        <BookSearch value={query} onChange={setQuery} />
      </header>

      <div style={{display:"grid",gridTemplateColumns:"340px 1fr",gap:16}}>
        <AddBookForm onAdd={add} />
        <BookTable items={filtered} onUpdate={update} onDelete={remove} />
      </div>
    </>
  );
}
