import express from 'express';
import { PcBuildController } from './pcBuild.controller';

const router = express.Router();

router.post('/', PcBuildController.createPcBuild);
router.get('/', PcBuildController.getPcBuild);

export const PcBuild = router;
