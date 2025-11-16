import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Necesitas instalar lucide-react

// La URL del logo debe ser correcta. Si está en 'public', usa '/Frame.png'.
const FRAME_LOGO_URL = '/Frame.png'; 

function Navbar() {
  const [token, setToken] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú móvil

  useEffect(() => {
    // Lógica para verificar el token de autenticación
    const storedToken = localStorage.getItem('authToken'); 
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };

  const navLinks = (
    <>
      <Link to="/catalogo" className="hover:text-white transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
        Catálogo
      </Link>
      <Link to="/marketplace" className="hover:text-white transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
        Marketplace
      </Link>
      <Link to="/comunidad" className="hover:text-white transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
        Comunidad
      </Link>
      <Link to="/novedades" className="hover:text-white transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
        Novedades
      </Link>
    </>
  );

  // APLICA EL AJUSTE PARA BOTONES COMPACTOS EN MD
  const authButtons = (
    <div className="flex gap-3 md:gap-5 flex-shrink-0">
      {!token ? (
        <>
          <Link
            to="/login"
            // Se usa text-sm en md, y vuelve a text-base en lg, para ganar espacio en 1067px
            className="bg-[#0F172A] border border-[#334155] hover:border-white text-[#94A3B8] hover:text-white px-3 py-1 lg:px-4 lg:py-2 rounded-lg font-exo2 transition-all text-sm md:text-sm lg:text-base whitespace-nowrap"
            onClick={() => setIsMenuOpen(false)}
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            // Se usa text-sm en md, y vuelve a text-base en lg, para ganar espacio en 1067px
            className="bg-[#1E293B] hover:bg-[#94A3B8] border border-[#CBD5E1] text-[#94A3B8] hover:text-[#0F172A] px-3 py-1 lg:px-4 lg:py-2 rounded-lg font-exo2 transition-all text-sm md:text-sm lg:text-base whitespace-nowrap"
            onClick={() => setIsMenuOpen(false)}
          >
            Registro
          </Link>
        </>
      ) : (
        <button
          onClick={() => { handleLogout(); setIsMenuOpen(false); }}
          // Se usa text-sm en md, y vuelve a text-base en lg, para ganar espacio en 1067px
          className="bg-[#1E293B] hover:bg-[#0F172A] border border-[#94A3B8] hover:border-white text-[#94A3B8] hover:text-white px-3 py-1 lg:px-4 lg:py-2 rounded-lg font-exo2 transition-all text-sm md:text-sm lg:text-base whitespace-nowrap"
        >
          Cerrar sesión
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* HEADER PRINCIPAL RESPONSIVO */}
      {/* CLASE AJUSTADA: padding lateral reducido a lg:px-8 */}
      <header className="bg-[#0F172A] w-full py-4 shadow-md flex justify-between items-center px-4 md:px-8 lg:px-8 fixed top-0 left-0 right-0 z-50">
        
        {/* Logo/Título */}
        <div className='flex items-center gap-3 flex-shrink-0'>
          <img src={FRAME_LOGO_URL} alt='GameZone Logo' className='w-10 h-10 md:w-12 md:h-12 object-contain' />
          <h1 className="font-audiowide text-3xl lg:text-4xl text-[#CBD5E1] tracking-wide">
            GameZone
          </h1>
        </div>

        {/* Menú de Navegación (Escritorio) */}
        {/* CLASE AJUSTADA: Usa flex-grow y gap-8 */}
        <nav className="hidden lg:flex justify-center flex-grow gap-8 font-exo2 text-lg font-semibold text-[#94A3B8]">
          {navLinks}
        </nav>

        {/* Botones de Auth (Escritorio) */}
        <div className="hidden lg:flex gap-5 flex-shrink-0">
            {authButtons}
        </div>
        
        {/* Botón de Menú (Móvil) */}
        <button 
          className="lg:hidden text-[#94A3B8] hover:text-white p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

      </header>

      {/* Menú Desplegable Móvil */}
      <div 
        className={`fixed inset-0 top-[72px] bg-[#0F172A] transition-transform duration-300 ease-in-out lg:hidden z-40 
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`
        }
      >
        <nav className="flex flex-col gap-4 p-6 font-exo2 text-xl font-semibold text-[#94A3B8]">
          {navLinks}
        </nav>

        <div className="p-6 border-t border-[#334155]">
          {authButtons}
        </div>
      </div>
    </>
  );
}

export default Navbar;