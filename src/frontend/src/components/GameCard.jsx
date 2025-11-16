import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link

/**
 * Componente para mostrar un solo juego en el catálogo.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.gameId - ID único del juego para el enlace.
 * @param {string} props.title - Título del juego.
 * @param {string} props.description - Breve descripción.
 * @param {string} props.imageUrl - URL de la imagen (placeholder por ahora).
 * @param {string} props.platform - Plataforma principal (ahora género).
 * @param {number} props.price - Precio del juego.
 */
function GameCard({ gameId, title, description, imageUrl, platform, price }) {
  // Generador de imagen placeholder
  const placeholderUrl = `https://placehold.co/400x250/203040/94A3B8?text=${encodeURIComponent(title)}`;
  
  // Función para formatear el precio (tomada de la sugerencia del usuario)
  const formattedPrice = price 
    ? Number(price).toLocaleString('es-ES', { style: 'currency', currency: 'USD' }) 
    : 'Gratis / N/A';

  return (
    // Tarjeta de juego con estilo futurista oscuro
    <div className="bg-[#182333] rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.03] hover:shadow-orange-500/50">
      
      {/* Imagen/Placeholder */}
      <img 
        src={imageUrl || placeholderUrl} 
        alt={`Portada de ${title}`} 
        className="w-full h-40 object-cover"
        onError={(e) => {
          // Fallback a un placeholder genérico si la imagen real falla
          e.target.onerror = null; 
          e.target.src = placeholderUrl;
        }}
      />
      
      {/* Contenido de la tarjeta */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-audiowide text-xl text-white truncate">{title}</h3>
            {/* Etiqueta de plataforma */}
            <span className="bg-[#334155] text-[#CBD5E1] text-xs font-semibold px-2 py-0.5 rounded-full ml-2 whitespace-nowrap">
                {platform}
            </span>
        </div>
        
        <p className="font-exo2 text-sm text-[#94A3B8] mb-4 line-clamp-3">
          {description}
        </p>
        
        {/* Precio - Nuevo elemento visual tomado de GameList */}
        <p className="text-2xl font-bold text-green-400 mb-4">
            {formattedPrice}
        </p>

        {/* Botón de acción (Ahora usa Link para ir a la página de detalles) */}
        <Link 
          to={`/game/${gameId}`} // Enlace dinámico al ID del juego
          className="w-full block text-center bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 rounded-lg transition-colors duration-200 shadow-md shadow-orange-600/50"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}

export default GameCard;