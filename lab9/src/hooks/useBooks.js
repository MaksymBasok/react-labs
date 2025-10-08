import { useMemo, useState, useCallback } from "react";

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  const add = useCallback(({ firstName, lastName, phone }) => {
    const f = firstName?.trim(); const l = lastName?.trim(); const p = phone?.trim();
    if (!f || !l || !p) {
      setError("All fields are required");
      return false;
    }
    setError(null);
    setBooks(list => [{ id: crypto.randomUUID(), firstName: f, lastName: l, phone: p }, ...list]);
    return true;
  }, []);

  const update = useCallback((id, patch) => {
    const f = patch.firstName?.trim?.(); const l = patch.lastName?.trim?.(); const p = patch.phone?.trim?.();
    if (("firstName" in patch && !f) || ("lastName" in patch && !l) || ("phone" in patch && !p)) {
      setError("Fields cannot be empty");
      return false;
    }
    setError(null);
    setBooks(list => list.map(b => (b.id === id ? { ...b, ...patch } : b)));
    return true;
  }, []);

  const remove = useCallback((id) => {
    setBooks(list => list.filter(b => b.id !== id));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;
    return books.filter(b =>
      b.firstName.toLowerCase().includes(q) ||
      b.lastName.toLowerCase().includes(q) ||
      b.phone.toLowerCase().includes(q)
    );
  }, [books, query]);

  return {
    books: filtered,
    allCount: books.length,
    visibleCount: filtered.length,
    query,
    error,

    setQuery,
    add,
    update,
    remove,
  };
}
