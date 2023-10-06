import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import DayNight from "./components/DayNight";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <DayNight />
    <App />
  </>
);
