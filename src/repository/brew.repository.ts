import { Brew } from "../datasources/index.js";
import { DataSource, Repository } from "typeorm";

export class BrewRepository {
    private readonly repo: Repository<Brew>;

    constructor(appDataSource: DataSource) {
        if (!appDataSource) {
            console.error("[DI] appDataSource is undefined in BrewRepository!");
            throw new Error("appDataSource is undefined in BrewRepository!");
        }
        this.repo = appDataSource.getRepository(Brew);
    }

    getAll(): Promise<Brew[]> {
        return this.repo.find();
    }

    getById(id: string): Promise<Brew | null> {
        return this.repo.findOneBy({id});
    }

    async create(brew: Omit<Brew, "id">): Promise<Brew> {
        const entity = this.repo.create(brew as Brew);
        return this.repo.save(entity);
    }

    async update(id: string, data: Partial<Omit<Brew, "id">>): Promise<Brew | null> {
        const entity = await this.repo.findOneBy({id});
        if (!entity) return null;
        Object.assign(entity, data);
        await this.repo.save(entity);
        return entity;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repo.delete(id);
        return result.affected === 1;
    }
}
