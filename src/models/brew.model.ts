export interface Brew {
    id: string;
    beans: string;
    method: string;
    rating?: number;
    notes?: string;
    brewedAt: Date;
    time: number;
}
