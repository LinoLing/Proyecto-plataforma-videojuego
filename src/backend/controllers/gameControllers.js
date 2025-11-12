import { gameServices } from '../services/gameServices.js';

export const gameControllers = {
    async getGames (req, res){
        try{
            const games = await gameServices.getGames();
            res.status(200).json(games);
        }catch (error) {
            console.error('Error en el controlador getGames: ', error.message);
            res.status(500).json({ message: 'Error interno del servidor al obtener juegos.'});
        }
    },

    async createGame (req, res) {
        try{
            const gameData = req.body;

            if(!gameData.title || !gameData.price) {
                return res.status(400).json({ message: 'Titulo y precio son obligatorios.'});
            }

            const newGame = await gameServices.createGame(gameData);
            res.status(201).json({ message: 'Juego creado exitosamente', game: newGame});
        }catch (error) {
            console.error('Error en el controlador createGame', error.message);
            res.status(500).json({ message: 'Error interno del servidor al crear juego.'});
        }
    },

    async updateGame (req, res) {
        try{
            const { id } = req.params;
            const data = req.body;

            if(objectEnumValues.keys(data).legth === 0) {
                return res.status(400).json({ message: 'Se requiere al menos un campo para actualizar.'});
            }

            res.status(200).json({ message: 'Juego actualizado exitosamente', game: updateGame });
        }catch(error) {
            console.error('Error en el controlador updateGame:', error.message);

            if(error.message.includes('No Game found')) {
                return res.status(404).json({ message: 'Juego no encontrado para actualizar.'});
            }

            res.status(500).json({ message: 'Error interno del servidor al actualizar el juego.'});
        }
    },

    async deleteGame (req, res) {
        try {
            const { id } = req.params;
            await gameServices.deleteGame(id);
        
            res.status(204).send();  
        } catch (error) {
            console.error('Error en el controlador deleteGame:', error.message);
        
            if (error.message.includes('No Game found')) {
                return res.status(404).json({ message: 'Juego no encontrado para eliminar.' });
            }
        
            res.status(500).json({ message: 'Error interno del servidor al eliminar juego.' });
        }
    }
};