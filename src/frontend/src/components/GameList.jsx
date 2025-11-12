import { useEffect, useState } from 'react';
const API_URL = "http://localhost:3000/api/games";

function GameList() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get(API_URL)
                setGames(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error al obtener los juegos:", err);
                setError("No se pudieron cargar los juegos. Inténtalo de nuevo más tarde.");
                setLoading(false);
            }
        };

        fetchGames();
    }, []);
    
    if (loading) {
        return <div className="text-xl text-center py-8">Cargando juegos... ⏳</div>;
    }

    if (error) {
        return <div className="text-red-600 text-center py-8">{error}</div>;
    }

    if (games.length === 0) {
        return <div className="text-gray-500 text-center py-8">No hay juegos disponibles en la plataforma.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-white">🎮 Catálogo de Juegos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {games.map((game) => (
                    <div 
                        key={game.id} 
                        className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
                    >
                        {/* Asumiendo que 'image' es una URL o ruta de imagen */}
                        <img 
                            src={game.image || 'placeholder.jpg'} 
                            alt={game.title} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-white truncate">{game.title}</h2>
                            <p className="text-sm text-gray-400 mt-1">{game.gender}</p>
                            {/* Formato de precio usando toLocaleString para divisas */}
                            <p className="text-2xl font-bold text-green-400 mt-3">
                                {Number(game.price).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
                            </p>
                            <button 
                                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition duration-200"
                            >
                                Comprar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameList;