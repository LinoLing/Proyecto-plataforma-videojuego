import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const GOOGLE_AUTH_URL = import.meta.env.VITE_GOOGLE_AUTH_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify ({ email, password }),
      });

      const data = await response.json();
      if(!response.ok){
        throw new Error (data.message||"Error al iniciar sesion");
    }

    localStorage.setItem("authToken", data.data.token);
      // Cambiar la redirección de "/login-success" a "/" o el catálogo,
      // asumiendo que el catálogo es la página de inicio tras iniciar sesión.
      // Si existe /login-success, mantenla.
      navigate ("/login-success");
        
    } catch (err) {
        setError(err.message);
    }
  };
  
  return (
    // CAMBIO 1: Fondo oscuro similar al Home (bg-gray-800 o bg-gray-900 para ser más oscuro)
    // El texto del div principal pasa a ser blanco (text-white)
    <div className="flex items-center justify-center min-h-screen bg-[#0F172A] text-[#CBD5E1]">
      {/* CAMBIO 2: Fondo del formulario en un color que contraste (ej. bg-gray-800 o mantener bg-white para claridad) */}
      <div className="w-full max-w-md p-8 space-y-6 bg-[#1E293B] rounded-xl shadow-2xl shadow-black border border-[#CBD5E1]">
        {/* CAMBIO 3: Título en color naranja/ámbar */}
        <h1 className="text-3xl font-audiowide text-center text-[#CBD5E1]">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              // CAMBIO 4: Labels en color claro
              className="block text-sm font-exo2 text-[#CBD5E1]"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // CAMBIO 5: Inputs con fondo oscuro y borde claro para el tema
              className="w-full px-3 py-2 mt-1 border border-[#94A3B8] bg-[#1E293B] text-[#CBD5E1] rounded-md shadow-md focus:outline-none focus:ring-white focus:border-white"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              // CAMBIO 4: Labels en color claro
              className="block text-sm font-exo2 text-[#CBD5E1]"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // CAMBIO 5: Inputs con fondo oscuro y borde claro para el tema
              className="w-full px-3 py-2 mt-1 border border-[#94A3B8] bg-[#1E293B] text-[#CBD5E1] rounded-md shadow-md focus:outline-none focus:ring-white focus:border-white"
            />
          </div>
          {error && <p className="text-sm text-center text-red-500">{error}</p>} 
          <div>
            <button
              type="submit"
              // CAMBIO 6: Botón principal en color naranja
              className="w-full px-4 py-2 text-[#94A3B8] font-exo2 bg-[#1E293B] border border-[#94A3B8] hover:border-[#FFFFFF] hover:text-[#FFFFFF] rounded-md shadow-md hover:bg-[#0F172A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-gray-800"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
        <div className="flex items-center">
          {/* CAMBIO 7: Separadores y texto 'O' en tonos de gris que contrasten */}
          <div className="flex-grow border-t border-[#CBD5E1]"></div>
          <span className="mx-4 text-sm font-exo2 text-[#CBD5E1]">O</span>
          <div className="flex-grow border-t border-[#CBD5E1]"></div>
        </div>
        <div className="text-center">
          <a
            // CAMBIO 8: Botón de Google en azul, pero con hover naranja
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-exo2 text-[#94A3B8] bg-[#1E293B] border border-[#94A3B8] hover:border-[#FFFFFF] hover:text-[#FFFFFF] rounded-md shadow-sm hover:bg-[#0F172A] transition duration-150 ease-in-out"
            href={GOOGLE_AUTH_URL}
          >
            Iniciar sesión con Google
          </a>
        </div>

        {/* CAMBIO 9: Texto de "¿No tienes cuenta?" en gris claro */}
        <p className="text-sm text-center text-[#94A3B8]">
          No tienes una cuenta?
        </p>
        <div className="text-center">
        <Link
          to="/register"
          // CAMBIO 10: Enlace de registro en color naranja
          className="font-medium text-[#94A3B8] hover:text-[#C084FC] transition duration-150 ease-in-out"
        >
          Regístrate aquí
        </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;