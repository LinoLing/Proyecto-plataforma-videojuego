import express from 'express';
import { gameControllers } from '../controllers/gameControllers.js';

const router = express.Router();

router.get('/',gameControllers.getGames);

router.post('/',gameControllers.createGame);

router.put('/',gameControllers.updatedGame);

router.delete('/',gameControllers.deteleGame);