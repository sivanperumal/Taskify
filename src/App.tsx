import { Route, BrowserRouter as Router, Routes } from "react-router";
import SignIn from "./pages/Authentication/SiginIn";
import SignUp from "./pages/Authentication/SignUp";
import MainLayout from "./components/MainLayout";
import TodoList from "./pages/Todo/List";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route element={<MainLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="todo" element={<TodoList />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
