import express from 'express';
import {gameControllers} from '../controllers/gameControllers.js';

const router = express.Router();

router.get('/',gameControllers.getGames);

/**
 * @swagger
 * /api/games:
 *   post:
 *     summary: Crear un nuevo juego en el catálogo 🎮
 *     tags: [Juegos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: El Misterio de GameZone
 *               price:
 *                 type: Decimal
 *                 example: 39.99
 *               gender:
 *                 type: string
 *                 example: Aventura
 *               image:
 *                 type: string
 *                 example: https://mi-servidor.com/images/misterio.jpg
 *     responses:
 *       201:
 *         description: Juego creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Juego creado exitosamente
 *                 game:
 *                   type: object
 *                   description: Los datos del juego recién creado (incluyendo el ID).
 *       400:
 *         description: Título y/o precio son obligatorios.
 *       500:
 *         description: Error interno del servidor al crear juego.
 */
router.post('/',gameControllers.createGame);

router.put('/:id',gameControllers.updateGame);

router.delete('/:id',gameControllers.deleteGame);

export default router;