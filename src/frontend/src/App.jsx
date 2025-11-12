import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from './pages/Register';
import Login from "./pages/Login";
import LoginSuccess from "./pages/LoginSuccess";
import LoginError from './pages/LoginError';
import GameList from "./components/GameList";


function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Aquí podrías tener tu barra de navegación (Navbar) */}
      <main>
        <BrowserRouter>
          <Routes>
            {/* Las rutas principales para navegación */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-error" element={<LoginError />} />
            <Route path="/login-success" element={<LoginSuccess />} />
            
            {/* Si quieres que GameList aparezca en una ruta específica (ej: /games) */}
            {/* <Route path="/games" element={<GameList />} /> */}

            {/* Si quieres que GameList se muestre SIEMPRE debajo de las rutas */}
            {/* <Route path="*" element={<GameList />} /> */}
          </Routes>
          
          {/* Si GameList no necesita ser una ruta (ej: es un componente estático) 
              puedes ponerlo aquí. Si debe ser parte de tu navegación, usa un Route. */}
          {/* <GameList /> */}
          
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;