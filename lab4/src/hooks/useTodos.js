import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export function useTodos(limit = 30) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { data } = await api.get("/todos", {
          params: { limit },
          signal: controller.signal,
        });
        const withCid = (data?.todos ?? []).map(t => ({ ...t, cid: `srv-${t.id}` }));
        setTodos(withCid);
      } catch (e) {
        if (!axios.isCancel(e)) setError(e?.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    })();
    return () => controller.abort();
  }, [limit]);

  const addTodo = useCallback(async (text) => {
    const cid = crypto.randomUUID();
    const temp = { cid, id: cid, todo: text, completed: false, userId: 0, _local: true };
    setTodos(list => [temp, ...list]);
    try {
      setAdding(true);
      const { data } = await api.post("/todos/add", {
        todo: text,
        completed: false,
        userId: 1,
      });
      setTodos(list => list.map(t => (t.cid === cid ? { ...data, cid, _local: true } : t)));
    } catch (e) {
      setTodos(list => list.filter(t => t.cid !== cid));
      setError(e?.message || "Add failed");
    } finally {
      setAdding(false);
    }
  }, []);

  const toggleTodo = useCallback(async (cid) => {
    let isLocal = false;
    let nextCompleted = false;
    let serverId = null;

    setTodos(list =>
      list.map(t => {
        if (t.cid === cid) {
          isLocal = !!t._local;
          serverId = t.id;
          nextCompleted = !t.completed;
          return { ...t, completed: nextCompleted };
        }
        return t;
      })
    );

    if (isLocal || serverId == null) return;

    try {
      await api.put(`/todos/${serverId}`, { completed: nextCompleted });
    } catch (e) {
      setTodos(list => list.map(t => (t.cid === cid ? { ...t, completed: !nextCompleted } : t)));
      setError(e?.message || "Toggle failed");
    }
  }, []);

  const deleteTodo = useCallback(async (cid) => {
    let removed = null;

    setTodos(list => {
      removed = list.find(t => t.cid === cid) || null;
      return list.filter(t => t.cid !== cid);
    });

    if (!removed || removed._local) return;

    try {
      const res = await api.delete(`/todos/${removed.id}`);
      if (res.status >= 400) throw new Error(`Delete failed: ${res.status}`);
    } catch (e) {
      setTodos(list => (removed ? [removed, ...list] : list));
      setError(e?.message || "Delete failed");
    }
  }, []);

  return { todos, isLoading, error, adding, addTodo, toggleTodo, deleteTodo };
}
