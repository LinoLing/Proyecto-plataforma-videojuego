import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from './pages/Register';
import Login from "./pages/Login";
import GameList from './components/GameList';
import LoginSuccess from "./pages/LoginSuccess";
import LoginError from './pages/LoginError';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-error" element={<LoginError />} />
        <Route path="/login-success" element={<LoginSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

import GameList from './components/GameList';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Aquí podrías tener tu barra de navegación (Navbar) */}
      <main>
        <GameList />
      </main>
    </div>
  );
}

export default App;