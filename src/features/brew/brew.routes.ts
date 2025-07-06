import { Router } from 'express';
import { makeClassInvoker } from 'awilix-express';
import { BrewController } from './brew.controller.js';

const router = Router();
const api = makeClassInvoker(BrewController);

router.get('/', api('getAll'));
router.get('/:id', api('getById'));
router.post('/', api('create'));
router.put('/:id', api('update'));
router.delete('/:id', api('delete'));

export default router;
