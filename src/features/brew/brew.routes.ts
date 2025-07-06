import { Router } from 'express';
import { makeClassInvoker } from 'awilix-express';
import { BrewController } from './brew.controller.js';
import { validateDto } from "../../utils/validate.js";
import { BrewCreateDto, BrewUpdateDto } from "../../dto/index.js";

const router = Router();
const api = makeClassInvoker(BrewController);

router.get('/', api('getAll'));
router.get('/:id', api('getById'));

router.post('/', validateDto(BrewCreateDto), api('create'));
router.put('/:id', validateDto(BrewUpdateDto), api('update'));
router.delete('/:id', api('delete'));

export default router;
