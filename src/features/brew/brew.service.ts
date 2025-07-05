import { Brew } from "../../models/index.js";
import { randomUUID } from "crypto";

class BrewService {
    private readonly brews: Brew[] = [];

    constructor() {
        this.brews = [
            {
                id: "1",
                beans: "Colombia",
                method: "espresso",
                brewedAt: new Date(),
                time: 30,
                rating: 5,
                notes: "Intense taste"
            },
            {
                id: "2",
                beans: "Ethiopia",
                method: "v60",
                brewedAt: new Date(),
                time: 180,
                rating: 4,
                notes: "Fruity aroma"
            }
        ];
    }

    async getBrews(): Promise<Brew[]> {
        return this.brews;
    }

    async getBrewById(id: string): Promise<Brew | undefined> {
        return this.brews.find(b => b.id === id);
    }

    async createBrew(brew: Omit<Brew, "id">): Promise<Brew> {
        const newBrew: Brew = {
            ...brew,
            id: randomUUID()
        };
        this.brews.push(newBrew);
        return newBrew;
    }

    async updateBrew(id: string, brew: Omit<Brew, "id">): Promise<Brew | undefined> {
        const index = this.brews.findIndex(b => b.id === id);
        if (index === -1) return undefined;
        const updatedBrew: Brew = {...brew, id};
        this.brews[index] = updatedBrew;
        return updatedBrew;
    }

    async deleteBrew(id: string): Promise<{ success: boolean; id: string }> {
        const index = this.brews.findIndex(b => b.id === id);
        if (index === -1) return {success: false, id};
        this.brews.splice(index, 1);
        return {success: true, id};
    }
}

export { BrewService };
