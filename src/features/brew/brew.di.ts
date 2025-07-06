import { BrewService } from './brew.service.js';
import { BrewController } from './brew.controller.js';
import { BrewRepository } from "../../repository/index.js";

export const brewModule = [
    {class: BrewRepository, scope: 'singleton'},
    {class: BrewService, scope: 'singleton'},
    {class: BrewController, scope: 'scoped'},
];
