import { BrewService } from './brew.service.js';
import { BrewController } from './brew.controller.js';

export const brewModule = [
    {class: BrewService, scope: 'singleton'},
    {class: BrewController, scope: 'scoped'},
];
