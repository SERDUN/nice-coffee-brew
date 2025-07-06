import { Request, Response, NextFunction } from 'express';
import { BrewService } from "./brew.service.js";

export class BrewController {
    static scope = 'scoped';

    brewService: BrewService;

    constructor(brewService: BrewService) {
        this.brewService = brewService;
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(await this.brewService.getBrews());
        } catch (err) {
            next(err);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            res.json(await this.brewService.getBrewById(id));
        } catch (err) {
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('Creating brew with body:', req.body);
            const brew = req.body;
            res.status(201).json(await this.brewService.createBrew(brew));
        } catch (err) {
            next(err);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const {id, name} = req.body;
            res.status(201).json(await this.brewService.updateBrew(id, name));
        } catch (err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            await this.brewService.deleteBrew(id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}
