import TodoApp from "./components/TodoApp.jsx";
import app from "./styles/App.module.css";

const App = () => (
  <main className={app.wrap}>
    <TodoApp  />
  </main>
);
export default App;
