import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export function useTodos(initialLimit = 10) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState("all"); // all | active | completed

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const skip = (page - 1) * limit;

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { data } = await api.get("/todos", {
          params: { limit, skip },
          signal: controller.signal,
        });
        setItems(data?.todos ?? []);
        setTotal(data?.total ?? 0);
      } catch (e) {
        if (!axios.isCancel(e)) setError(e?.message || "Fetch failed");
      } finally {
        setIsLoading(false);
      }
    })();
    return () => controller.abort();
  }, [limit, skip]);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    let arr = items;
    if (q) arr = arr.filter(t => t.todo.toLowerCase().includes(q));
    if (filterMode === "active") arr = arr.filter(t => !t.completed);
    if (filterMode === "completed") arr = arr.filter(t => t.completed);
    return arr;
  }, [items, searchTerm, filterMode]);

  const todos = filtered;

  const goToNextPage = useCallback(
    () => setPage(p => Math.min(p + 1, totalPages)),
    [totalPages]
  );
  const goToPrevPage = useCallback(
    () => setPage(p => Math.max(1, p - 1)),
    []
  );
  const changeLimit = useCallback((val) => { setLimit(val); setPage(1); }, []);

  const addTodo = useCallback(async (text) => {
    const tempId = crypto.randomUUID();
    const temp = { id: tempId, todo: text, completed: false, userId: 1, _temp: true };
    setItems(list => [temp, ...list]);
    try {
      const { data } = await api.post("/todos/add", { todo: text, completed: false, userId: 1 });
      setItems(list => list.map(t => (t.id === tempId ? { ...data, _temp: false } : t)));
      setTotal(x => x + 1);
    } catch (e) {
      setItems(list => list.filter(t => t.id !== tempId));
      setError(e?.message || "Add failed");
    }
  }, []);

  // вважаємо "серверним" тільки item з числовим id <= 200 і без _temp
  const isServerItem = (t) =>
    !!t && !t._temp && typeof t.id === "number" && Number.isFinite(t.id) && t.id <= 200;

  const toggleTodo = useCallback(async (id, nextCompleted) => {
    setItems(list => list.map(t => (t.id === id ? { ...t, completed: nextCompleted } : t)));

    const target = items.find(t => t.id === id);
    if (!isServerItem(target)) return;

    try {
      await api.put(`/todos/${id}`, { completed: nextCompleted });
    } catch {
      // мовчазний відкат тільки для справжніх збоїв
      setItems(list => list.map(t => (t.id === id ? { ...t, completed: !nextCompleted } : t)));
    }
  }, [items]);

  const editTodoTitle = useCallback(async (id, newTitle) => {
    const prev = items;
    setItems(list => list.map(t => (t.id === id ? { ...t, todo: newTitle } : t)));

    const target = items.find(t => t.id === id);
    if (!isServerItem(target)) return;

    try {
      await api.put(`/todos/${id}`, { todo: newTitle });
    } catch {
      setItems(prev);
    }
  }, [items]);

  const deleteTodo = useCallback(async (id) => {
    let removed = null;
    setItems(list => {
      removed = list.find(t => t.id === id) || null;
      return list.filter(t => t.id !== id);
    });

    if (!isServerItem(removed)) { setTotal(x => Math.max(0, x - 1)); return; }

    try {
      await api.delete(`/todos/${id}`);
      setTotal(x => Math.max(0, x - 1));
    } catch {
      if (removed) setItems(list => [removed, ...list]);
    }
  }, [items]);

  return {
    todos, isLoading, error,
    page, limit, total, totalPages,
    goToNextPage, goToPrevPage, setLimit: changeLimit,
    searchTerm, setSearchTerm,
    filterMode, setFilterMode,
    addTodo, toggleTodo, editTodoTitle, deleteTodo,
  };
}