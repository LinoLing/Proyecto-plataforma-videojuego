import { useState, useEffect } from 'react'; 
// Eliminamos la importación de Navbar, ya que se renderiza globalmente en App.jsx
// RUTA CORREGIDA: Re-agregamos la extensión .jsx para solucionar el error de resolución.
import GameCard from '../components/GameCard.jsx'; 

// La URL se mantiene relativa
const API_URL = '/api/games'; 

function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función asíncrona para cargar los datos desde la API
    const fetchGames = async () => {
      try {
        setLoading(true); // Inicia la carga
        // Usamos fetch, corrigiendo el error potencial en el que GameList usaba 'axios' sin importar
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          // Si la respuesta no es 2xx, lanza un error
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Asumiendo que 'data' es un array de juegos
        setGames(data); 
        setError(null);
      } catch (error) {
        console.error("Error al obtener juegos:", error.message);
        setError(`No se pudieron cargar los juegos. Intenta de nuevo más tarde. Detalle: ${error.message || error}`);
        setGames([]); // Limpia la lista en caso de error
      } finally {
        setLoading(false); // Finaliza la carga, ya sea con éxito o error
      }
    };

    fetchGames();
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

  // Renderizado condicional basado en el estado
  
  // 1. Mostrar estado de carga (mantenemos la estructura)
  if (loading) {
    return (
      <div className='min-h-screen bg-[#1E293B] flex flex-col items-center justify-center pt-24'>
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500"></div>
        <p className="mt-4 font-exo2 text-xl text-[#94A3B8]">Cargando catálogo... ⏳</p>
      </div>
    );
  }

  // 2. Mostrar estado de error (mantenemos la estructura)
  if (error) {
    return (
      <div className='min-h-screen bg-[#1E293B] flex flex-col items-center justify-center pt-24'>
        <h2 className="font-audiowide text-3xl text-red-500 mb-4">¡Error!</h2>
        <p className="font-exo2 text-lg text-[#94A3B8]">{error}</p>
      </div>
    );
  }

  // 3. Mostrar catálogo si no hay juegos (servidor responde OK, pero la lista está vacía)
  if (games.length === 0) {
    return (
      <div className='min-h-screen bg-[#1E293B] p-4 md:p-8 pt-24 md:pt-28 lg:pt-32'>
        <main className="text-center">
            <h2 className="font-audiowide text-4xl text-orange-500 mb-8">Catálogo de Juegos Destacados</h2>
            <p className="font-exo2 text-xl text-[#94A3B8]">No hay juegos disponibles en este momento. ¡Vuelve pronto! 💔</p>
        </main>
      </div>
    );
  }

  // 4. Renderizado del catálogo (Juegos cargados con éxito)
  return (
    <div className='min-h-screen bg-[#1E293B]'>
      
      {/* CONTENIDO PRINCIPAL DE LA HOME */}
      <main className="pt-24 md:pt-28 lg:pt-32 p-4 md:p-8">
        {/* Adoptamos el título de tu GameList, pero con nuestro estilo */}
        <h2 className="font-audiowide text-4xl lg:text-5xl text-orange-500 mb-10 text-center tracking-wider">
          🎮 Catálogo de Juegos Destacados
        </h2>
        
        {/* CUADRÍCULA RESPONSIVA DE JUEGOS */}
        {/* Adoptamos la clase 'container mx-auto' que sugeriste */}
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {games.map(game => (
            // AQUI USAMOS LOS DATOS REALES RECIBIDOS DE LA API
            <GameCard
              key={game.id || game._id} 
              gameId={game.id || game._id} 
              title={game.title}
              // Eliminamos el precio de la descripción aquí, ya que GameCard lo muestra por separado
              description={`Género: ${game.gender || 'N/A'}`}
              platform={game.gender || 'N/A'} 
              imageUrl={game.image} 
              price={game.price} // ¡Añadimos el precio como prop!
            />
          ))}
        </div>
      </main>
    </div>
  );
}
export default Home;