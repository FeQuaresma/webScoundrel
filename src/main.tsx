import { createRoot } from "react-dom/client";

import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home/index.tsx";
import Game from "./pages/game/index.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  </BrowserRouter>
);
