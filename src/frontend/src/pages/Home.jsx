import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Frame from '../assets/Frame.png';

function Home() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  },
    []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };

  return (
    <div className='min-h-screen bg-[#1E293B] p-8'>
      <header className="bg-[#0F172A] w-full py-4 shadow-md flex justify-between items-center px-12 fixed top-0 left-0 right-0 z-50">
        <div className='flex items-center gap-3'>
          <img src={Frame} alt='GameZone Logo' className='w-12 h-12 object-contain' />
          <h1 className="font-audiowide text-4xl text-[#CBD5E1] tracking-wide">GameZone</h1>
        </div>

        
        <nav className="flex gap-10 font-exo2 text-5x1 font-semibold text-[#94A3B8] mr-8">
          <Link to="/catalogo" className="hover:text-white transition-colors duration-200">
             Catálogo
          </Link>
          <Link to="/marketplace" className="hover:text-white transition-colors duration-200">
             Marketplace
          </Link>
          <Link to="/comunidad" className="hover:text-white transition-colors duration-200">
            Comunidad
          </Link>
          <Link to="/novedades" className="hover:text-white transition-colors duration-200">
             Novedades
          </Link>
        </nav>

        <div className="flex gap-5">
          {!token ? (
            <>
              <Link
                to="/login"
                className="bg-[#0F172A] border border-[#334155] hover:border-white text-[#94A3B8] hover:text-white px-4 py-2 rounded-lg font-exo2 transition-all"
              >
                Iniciar sesión
              </Link>
              <Link
                 to="/register"
                 className="bg-[#1E293B] hover:bg-[#94A3B8] border border-[#CBD5E1] text-[#94A3B8] hover:text-[#0F172A] px-4 py-2 rounded-lg font-exo2 transition-all"
              >
                Registro
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-[#1E293B] hover:bg-[#0F172A] border border-[#94A3B8] hover:border-white text-[#94A3B8] hover:text-white px-4 py-2 rounded-lg font-exo2 transition-all"
            >
              Cerrar sesión
            </button>
          )}
        </div>

      </header>
      {/* CONTENIDO */}
      <main className="p-8 pt-24">
        <h2 className="font-audiowide text-3xl text-orange-500 mb-4">
          Bienvenido a mi página 🏡
        </h2>
      </main>
    </div>
  );
}
export default Home;