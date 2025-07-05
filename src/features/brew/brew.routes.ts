import { Router } from 'express';
import { BrewController } from "./brew.controller.js";

const router = Router();
const brewController = new BrewController();

router.get('/', brewController.getAll.bind(brewController));
router.get('/:id', brewController.getById.bind(brewController));
router.post('/', brewController.create.bind(brewController));
router.put('/:id', brewController.update.bind(brewController));
router.delete('/:id', brewController.delete.bind(brewController));

export default router;
