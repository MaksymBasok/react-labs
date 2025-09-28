import TodoList from "./components/TodoList.jsx";
import styles from "./styles/App.module.css";

const App = () => {
  return (
    <main className={styles.wrap}>
      <TodoList initial={[{ id: "seed-1", text: "Learn React" }]} />
    </main>
  );
};

export default App;
