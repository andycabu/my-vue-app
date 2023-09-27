import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import TasksPage from "./pages/TasksPage";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/add-tasks" element={<TasksPage />} />
          <Route path="/tasks/:id" element={<TasksPage />} />
          <Route path="/productos" element={<h1>Prueba</h1>} />
          <Route path="/profile" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
