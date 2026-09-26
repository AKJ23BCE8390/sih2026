import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "leaflet/dist/leaflet.css";
import { applyTheme } from "./theme/colors";

const savedTheme = window.localStorage.getItem("veda-bytes-theme");
applyTheme(savedTheme === "light" ? "light" : "dark");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
