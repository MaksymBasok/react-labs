import { useEffect, useMemo, useState } from "react";
import { useTodos } from "../hooks/useTodos.js";
import AddTodoForm from "./AddTodoForm.jsx";
import TodoItem from "./TodoItem.jsx";
import TodoFilters from "./TodoFilters.jsx";
import TodoStatus from "./TodoStatus.jsx";
import TodoPagination from "./TodoPagination.jsx";
import styles from "../styles/TodoList.module.css";

const TodoList = ({ ...props }) => {
  const { todos, isLoading, error, adding, addTodo, toggleTodo, deleteTodo } = useTodos(200);

  const [mode, setMode] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return todos.filter(t => {
      const byMode =
        mode === "all" ||
        (mode === "active" && !t.completed) ||
        (mode === "completed" && t.completed);
      const byQuery = !q || String(t.todo).toLowerCase().includes(q);
      return byMode && byQuery;
    });
  }, [todos, mode, query]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filtered.length / pageSize)),
    [filtered.length, pageSize]
  );

  const pageSlice = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [totalPages, page]);

  return (
    <section className={styles.card} {...props}>
      <TodoFilters mode={mode} onModeChange={setMode} query={query} onQueryChange={(v)=>{ setQuery(v); setPage(1); }} />
      <AddTodoForm onAdd={(text) => { addTodo(text); setPage(1); }} pending={adding} />
      <TodoStatus isLoading={isLoading} error={error} isEmpty={!isLoading && !error && filtered.length === 0} />
      <ul className={styles.list}>
        {pageSlice.map(t => (
          <TodoItem key={t.cid} task={t} onToggle={toggleTodo} onDelete={deleteTodo} />
        ))}
      </ul>
      <TodoPagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
        pageSize={pageSize}
        onPageSizeChange={(s)=>{ setPageSize(s); setPage(1); }}
      />
    </section>
  );
};
export default TodoList;
