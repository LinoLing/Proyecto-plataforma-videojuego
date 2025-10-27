import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient;

export const userServices ={

    //crear usuarios
     async createUser(data){
        try{
            const{email, name} = data;
            return await prisma.user.create({
                data :{email, name}
            })
        }catch(error){
            throw new Error ('Error al crear usuario' + error.message)
        }
    },

    //obtener mis usuarios
    async getUser(){
        try{
            return await prisma.user.findMany();
        }catch(error){
            throw new Error ('Error al obtener usuarios' + error.message);
        }
    },

    //actualizar usuario
    async updateUser(id, data){
        try{
            return await prisma.user.update({
                where: {id:parseInt(id)},
                data: data
            });
        }catch(error){
            throw error ('Error al actualizar usuario'+ error.message);
        }
    },

    //Eliminar usuario
    async deleteUser(name){
        try{
            const existingUser = await prisma.user.findFirst({
                where: {name}
            });
            if(!existingUser){
                return null;
            }

            const deletedUser = await prisma.user.delete({
                where: {id: existingUser.id}
            });
            return deletedUser;
        }catch(error){
            throw new Error ('Error al eliminar usuario'+ error.message);
        }
    }
}