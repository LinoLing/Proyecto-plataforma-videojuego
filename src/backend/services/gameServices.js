import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient;

export const gameServices = {
    async getGames() {
        try{
            return await prisma.game.findMany({
                orderBy: { createdAt: 'desc'}
            });
        }catch(error) {
            throw new Error('Error al obtener juegos: ' + error.message);
        }
    },

    async createGame(data) {
        try{
            const { title, image, gender, price } = data;
            return await prisma.game.create({
                data: {
                    title,
                    image,
                    gender,
                    price: Decimal(price)
                }
            });
        }catch(error){
            throw new Error('Error al actualizar juego: ' +error.message);
        }
    },

    async updateGame(id, data) {
        try{
            return await prisma.game.update({
                where: { id: parseInt(id) },
                data
            });
        }catch(error){
            throw new Error('Error al actualizar juego: ' + error.message);
        }
    },

    async deleteGame(id) {
        try {
            return await prisma.game.delete({
                where: { id: parseInt(id) }
            });
        }catch(error) {
            throw new Error ('Error al eliminar juego: ' + error.message);
        }
    }
};