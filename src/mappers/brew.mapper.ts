import { Brew } from '../models/brew.model';
import { nanoid } from "nanoid";

export type BrewCreateDto = Omit<Brew, 'id'> & { brewedAt: string | Date };

export function toBrew(dto: BrewCreateDto): Brew {
    return {
        ...dto,
        id: nanoid(),
        brewedAt: typeof dto.brewedAt === 'string' ? new Date(dto.brewedAt) : dto.brewedAt,
    };
}

export function brewToDto(brew: Brew) {
    return {
        ...brew,
        brewedAt: brew.brewedAt.toISOString(),
    };
}
