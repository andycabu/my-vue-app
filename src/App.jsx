import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import TasksPage from "./pages/TasksPage";
import ProductsPage from "./pages/ProductsPage";
import TaskFormPage from "./pages/TaskFormPage";
import { AppProvider } from "./context/AppContext";
import { TaskProvider } from "./context/TaskContext";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import { ProductProvider } from "./context/ProductContext";
import ProductFormPage from "./pages/ProductFormPage";

function App() {
  return (
    <AppProvider>
      <TaskProvider>
        <ProductProvider>
          <BrowserRouter>
            <header className="fixed top-0  w-full z-20">
              <Navbar />
            </header>
            <main className="flex justify-center flex-col mt-8 pt-24">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<HomePage />} />

                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/task-add" element={<TaskFormPage />} />
                  <Route path="/task" element={<TaskFormPage />} />

                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product-add" element={<ProductFormPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
              </Routes>
            </main>
          </BrowserRouter>
        </ProductProvider>
      </TaskProvider>
    </AppProvider>
  );
}

export default App;
