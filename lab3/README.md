# Component Tree & Data Flow

## Diagram
![Component Tree Diagram](assets/Diagram.drawio.png)

## Description

### App
- Root-компонент, не має власного стану.
- Рендерить **TodoList**.

---

### TodoList
- **State**: `todos[]` (масив завдань).
- **Props**: немає (усі дані зберігаються локально).
- Передає `onAddTodo` у **AddTodoForm**.
- Передає `task`, `onDelete` у кожен **TodoItem**.

---

### AddTodoForm
- **State**: `text` (значення інпуту).
- **Props**: `onAddTodo(newTask)`.
- Викликає `onAddTodo(newTask)` вгору для додавання нового завдання.

---

### TodoItem
- **State**: `completed` (`true/false`).
- **Props**:
  - `task { id, text }`
  - `onDelete(id)`
- Тоглить `completed` локально через checkbox.
- Викликає `onDelete(id)` вгору для видалення завдання.

---

## Data Flow
- **Props down**:
  - `App → TodoList`
  - `TodoList → AddTodoForm (onAddTodo)`
  - `TodoList → TodoItem (task, onDelete)`

- **Callbacks up**:
  - `AddTodoForm → TodoList (onAddTodo(newTask))`
  - `TodoItem → TodoList (onDelete(id))`
