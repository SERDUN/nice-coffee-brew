import { z } from "zod";

export const BrewMethodEnum = z.enum(["v60", "aeropress", "chemex", "espresso"]);

export const BrewSchema = z.object({
    id: z.string().openapi({description: "Unique identifier for the brew"}),
    beans: z.string().min(3).max(40).openapi({description: "Name of the beans used in the brew"}),
    method: BrewMethodEnum.openapi({description: "Brew method"}),
    rating: z.number().min(1).max(5).optional().openapi({description: "Rating of the brew, from 1 to 5"}),
    notes: z.string().max(20).optional().openapi({description: "Notes for this brew"}),
    brewedAt: z.union([z.string().datetime(), z.date()]).openapi({description: "Brew at"}),
});

export type Brew = z.infer<typeof BrewSchema>;

export const BrewCreateDto = BrewSchema.omit({id: true});
export type BrewCreateDto = z.infer<typeof BrewCreateDto>;

export const BrewUpdateDto = BrewCreateDto.partial().extend({
    id: z.string(),
});
export type BrewUpdateDto = z.infer<typeof BrewUpdateDto>;

export const BrewResponseDto = BrewSchema;
export type BrewResponseDto = z.infer<typeof BrewResponseDto>;

registry?.register('User', BrewSchema);