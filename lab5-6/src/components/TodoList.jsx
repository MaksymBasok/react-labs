import { useMemo } from "react";
import { useTodos } from "../hooks/useTodos";
import TodoApp from "./TodoApp";
import AddTodoForm from "./AddTodoForm";
import TodoFilters from "./TodoFilters";
import TodoStatus from "./TodoStatus";
import TodoPagination from "./TodoPagination";
import TodoSummary from "./TodoSummary";
import TodoItem from "./TodoItem";
import styles from "../styles/TodoList.module.css";

const TodoList = ({ ...props }) => {
  const {
    todos, isLoading, error,
    page, limit, total, totalPages,
    goToNextPage, goToPrevPage, setLimit,
    searchTerm, setSearchTerm,
    filterMode, setFilterMode,
    addTodo, toggleTodo, editTodoTitle, deleteTodo,
  } = useTodos(10);

  const completedVisible = useMemo(() => todos.filter(t => t.completed).length, [todos]);

  return (
    <TodoApp>
      <section className={styles.card} {...props}>
        <h2 className={styles.title}>Todos</h2>

        <div className={styles.toolbar}>
          <AddTodoForm onAdd={addTodo} />
          <TodoFilters
            search={searchTerm}
            mode={filterMode}
            onSearchChange={setSearchTerm}
            onModeChange={setFilterMode}
          />
        </div>

        <TodoSummary
          total={total}
          visible={todos.length}
          completed={completedVisible}
          onResetSearch={() => setSearchTerm("")}
        />

        <TodoStatus isLoading={isLoading} error={error} empty={!todos.length} />

        <ul className={styles.list}>
          {todos.map(t => (
            <TodoItem
              key={t.id}
              task={t}
              onToggle={(id, next) => toggleTodo(id, next)}
              onEdit={editTodoTitle}
              onDelete={deleteTodo}
            />
          ))}
        </ul>

        <TodoPagination
          page={page}
          totalPages={totalPages}
          totalItems={total}
          limit={limit}
          onPrev={goToPrevPage}
          onNext={goToNextPage}
          onLimitChange={setLimit}
        />
      </section>
    </TodoApp>
  );
};

export default TodoList;
