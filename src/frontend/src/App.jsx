import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Eliminamos la extensión .jsx de todas las importaciones
import Navbar from './components/Navbar'; 
import Home from './pages/Home'; 
import GameDetail from './pages/GameDetail'; 

// Importar los componentes de autenticación
import Register from './pages/Register'; 
import Login from "./pages/Login"; 
import LoginSuccess from "./pages/LoginSuccess"; 
import LoginError from './pages/LoginError'; 

// Nota: El componente GameList se reemplaza por Home, que ya renderiza GameCard.

/**
 * Componente principal que maneja el enrutamiento de la aplicación, incluyendo
 * la barra de navegación y las rutas de autenticación y catálogo de juegos.
 */
function App() {
  return (
    <Router>
      {/* 3. Colocamos el Navbar aquí para que se muestre en todas las rutas */}
      <Navbar /> 
      
      <div className="min-h-screen bg-[#1E293B]"> {/* Usamos el color de fondo de nuestro tema */}
        <main>
          <Routes>
            {/* 1. Ruta principal - Muestra el catálogo de juegos (Home) */}
            <Route path="/" element={<Home />} />
            
            {/* 2. Ruta dinámica de detalles - Permite ver un juego por su ID */}
            <Route path="/games/:id" element={<GameDetail />} />
            
            {/* Rutas de autenticación */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-error" element={<LoginError />} />
            <Route path="/login-success" element={<LoginSuccess />} />

            {/* 4. Ruta 404/No Encontrada (Opcional) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Componente simple para la página no encontrada
function NotFound() {
    return (
        <div className='min-h-screen bg-[#1E293B] flex flex-col items-center justify-center'>
            <h1 className='font-audiowide text-6xl text-orange-500'>404</h1>
            <p className='font-exo2 text-xl text-[#CBD5E1] mt-4'>Página no encontrada.</p>
            <a href="/" className='mt-6 font-exo2 text-lg text-[#94A3B8] hover:text-white transition-colors'>Volver a Inicio</a>
        </div>
    );
}

export default App;