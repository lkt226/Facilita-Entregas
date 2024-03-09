import express from 'express';
import * as TrajectoryController from '../controllers/TrajectoryController';

const router = express.Router();

router.post('/', TrajectoryController.calculeTrajectory);

export default router;
