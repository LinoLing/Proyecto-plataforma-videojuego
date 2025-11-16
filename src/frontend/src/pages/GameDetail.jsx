import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Eliminamos la importación de Navbar, ya que se renderiza globalmente en App.jsx
// import Navbar from '../components/Navbar'; 

/**
 * Página que muestra los detalles de un juego específico.
 * Obtiene el ID del juego de la URL y consulta el endpoint /api/games/:id.
 */
function GameDetail() {
  const { id } = useParams(); // Obtiene el ID del juego de la URL (/game/:id)
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL del API para un juego específico
  const API_URL = `/api/games/${id}`; 

  useEffect(() => {
    if (!id) {
        setError("ID de juego no proporcionado.");
        setLoading(false);
        return;
    }

    const fetchGameDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        
        if (response.status === 404) {
             throw new Error(`Juego no encontrado (ID: ${id})`);
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setGame(data); 
        setError(null);
      } catch (err) {
        console.error("Error al obtener detalles del juego:", err);
        setError(err.message || "No se pudieron cargar los detalles del juego.");
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id, API_URL]); // Se ejecuta al montar y si cambia el ID

  // Renderizado condicional
  if (loading) {
    return (
      // Nota: El Navbar se renderiza en App.jsx, por lo que no lo incluimos aquí.
      <div className='min-h-screen bg-[#1E293B] flex flex-col items-center justify-center pt-24'>
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500"></div>
        <p className="mt-4 font-exo2 text-xl text-[#94A3B8]">Cargando detalles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-[#1E293B] p-4 md:p-8'>
        <main className="pt-24 md:pt-28 lg:pt-32 flex justify-center">
            <div className="text-center p-6 bg-[#182333] rounded-xl shadow-2xl">
                <h2 className="font-audiowide text-3xl text-red-500 mb-4">Error al Cargar</h2>
                <p className="font-exo2 text-lg text-[#94A3B8]">{error}</p>
            </div>
        </main>
      </div>
    );
  }

  if (!game) {
      // Debería ser capturado por el error, pero como seguridad
      return (
        <div className='min-h-screen bg-[#1E293B] p-4 md:p-8'>
            <main className="pt-24 md:pt-28 lg:pt-32 text-center">
                <h2 className="font-audiowide text-3xl text-orange-500">Juego no encontrado.</h2>
            </main>
        </div>
      );
  }

  // Renderizado de los detalles del juego
  return (
    <div className='min-h-screen bg-[#1E293B] p-4 md:p-8'>
      
      <main className="pt-24 md:pt-28 lg:pt-32">
        <div className="max-w-4xl mx-auto bg-[#182333] rounded-xl shadow-2xl p-6 md:p-10 lg:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Columna de Imagen */}
          <div className="md:col-span-1">
            <img 
              src={game.image} 
              alt={`Portada de ${game.title}`} 
              className="w-full h-auto rounded-lg shadow-xl object-cover border border-orange-500/50"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = `https://placehold.co/400x600/203040/94A3B8?text=${encodeURIComponent(game.title)} - No Image`;
              }}
            />
          </div>

          {/* Columna de Detalles */}
          <div className="md:col-span-2 text-white">
            <h1 className="font-audiowide text-4xl lg:text-5xl text-orange-500 mb-4">{game.title}</h1>
            
            <div className="mb-6 space-y-2">
                <p className="font-exo2 text-lg text-[#94A3B8]">
                    <span className='text-white font-semibold'>Género:</span> {game.gender || 'N/A'}
                </p>
                <p className="font-exo2 text-lg text-[#94A3B8]">
                    <span className='text-white font-semibold'>Precio:</span> {game.price ? Number(game.price).toLocaleString('es-ES', { style: 'currency', currency: 'USD' }) : 'N/A'}
                </p>
                <p className="font-exo2 text-lg text-[#94A3B8]">
                    <span className='text-white font-semibold'>ID (Debug):</span> {id}
                </p>
            </div>

            <h3 className="font-audiowide text-2xl text-[#CBD5E1] mb-2 border-b border-[#334155] pb-1">Descripción</h3>
            <p className="font-exo2 text-base text-[#94A3B8] leading-relaxed">
              {game.description || 'Descripción no disponible.'}
            </p>
            
            {/* Botón de Compra/Acción */}
            <button 
                className="mt-8 bg-green-600 hover:bg-sgreen-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg shadow-green-600/50"
                onClick={() => console.log(`Añadiendo ${game.title} al carrito...`)}
            >
                Comprar ahora
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

export default GameDetail;