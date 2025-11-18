
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  // Para redirigir al usuario después del registro
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar el usuario');
      }

      console.log('Usuario registrado:', data);
      navigate('/login-success');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0F172A]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#1E293B] border border-[#CBD5E1] rounded-xl shadow-md">
        <h1 className="text-2xl font-audiowide text-center text-[#CBD5E1]">Crear una cuenta</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-audiowide text-[#CBD5E1]">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mt-1 bg-[#1E293B] border border-[#94A3B8] rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-white"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-audiowide text-[#CBD5E1]">
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 bg-[#1E293B] border border-[#94A3B8] rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-audiowide text-[#CBD5E1]">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 bg-[#1E293B] border border-[#94A3B8] rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-white"
            />
          </div>

          {/* Mensaje de error*/}
          {error && <p className="text-sm text-center text-red-600">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-exo2 text-[#94A3B8] bg-[#1E293B] border border-[#CBD5E1] rounded-md shadow-sm hover:bg-[#94A3B8] hover:border-[#0F172A] hover:text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F172A]"
            >
              Registrarse
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-[#94A3B8]">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="font-medium text-[#94A3B8] hover:text-[#C084FC]">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
