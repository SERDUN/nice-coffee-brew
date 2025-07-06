import { Brew } from "../../datasources/brew.entity.js";
import { BrewRepository } from "../../repository/brew.repository.js";

class BrewService {
    static scope = 'scoped';

    brewRepository: BrewRepository;

    constructor(brewRepository: BrewRepository) {
        this.brewRepository = brewRepository;
    }

    async getBrews(): Promise<Brew[]> {
        return this.brewRepository.getAll();
    }

    async getBrewById(id: string): Promise<Brew | null> {
        return this.brewRepository.getById(id);
    }

    async createBrew(brew: Omit<Brew, "id">): Promise<Brew> {
        return this.brewRepository.create(brew);
    }

    async updateBrew(id: string, brew: Omit<Brew, "id">): Promise<Brew | null> {
        return this.brewRepository.update(id, brew);
    }

    async deleteBrew(id: string): Promise<{ success: boolean; id: string }> {
        const success = await this.brewRepository.delete(id);
        return {success, id};
    }
}

export { BrewService };