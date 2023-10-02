import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import { AppProvider } from "./context/AppContext";
import { TaskProvider } from "./context/TaskContext";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AppProvider>
      <TaskProvider>
        <BrowserRouter>
          <header className="fixed top-0 w-full z-20">
            <Navbar />
          </header>
          <main className="h-full justify-center  px-16 flex flex-col gap-4 items-center w-full">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<HomePage />} />

                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/task-add" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AppProvider>
  );
}

export default App;
