import Profile from "./components/Profile";
import "./App.css";
import "./index.css";

const users = [
  {
    id: 1,
    name: "Leanne Graham",
    role: "Frontend Developer",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leanne"
  },
  {
    id: 2,
    name: "Ervin Howell",
    role: "Backend Developer",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ervin"
  },
  {
    id: 3,
    name: "Clementine Bauch",
    role: "UI/UX Designer",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Clementine"
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    role: "QA Engineer",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia"
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    role: "Project Manager",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chelsey"
  },
  {
    id: 6,
    name: "Mrs. Dennis Schulist",
    role: "DevOps Engineer",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dennis"
  },
  {
    id: 7,
    name: "Kurtis Weissnat",
    role: "Fullstack Developer",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kurtis"
  },
  {
    id: 8,
    name: "Nicholas Runolfsdottir V",
    role: "Product Owner",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nicholas"
  },
  {
    id: 9,
    name: "Glenna Reichert",
    role: "Marketing Specialist",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Glenna"
  },
  {
    id: 10,
    name: "Clementina DuBuque",
    role: "Business Analyst",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Clementina"
  }
];

const App = () => {
  return (
    <main className="grid">
      {users.map(user => (
        <Profile
          key={user.id}
          name={user.name}
          role={user.role}
          avatarUrl={user.avatarUrl}
          data-id={user.id}
        />
      ))}
    </main>
  );
};

export default App;
