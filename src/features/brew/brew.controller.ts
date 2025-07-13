import { Request, Response, NextFunction } from 'express';
import { BrewService } from "./brew.service.js";
import { respondCreated, respondNoContent, respondOk } from "../../utils/index.js";

export class BrewController {
    static scope = 'scoped';

    brewService: BrewService;

    constructor(brewService: BrewService) {
        this.brewService = brewService;
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            respondOk(res, await this.brewService.getBrews());
        } catch (err) {
            next(err);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            respondOk(res, await this.brewService.getBrewById(id));
        } catch (err) {
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('Creating brew with body:', req.body);
            const brew = req.body;
            respondCreated(res, await this.brewService.createBrew(brew));
        } catch (err) {
            next(err);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const {id, name} = req.body;
            respondCreated(res, await this.brewService.updateBrew(id, name));
        } catch (err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            await this.brewService.deleteBrew(id);
            respondNoContent(res);
        } catch (err) {
            next(err);
        }
    }
}
