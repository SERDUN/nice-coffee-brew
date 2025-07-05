import { z } from "zod";

export const BrewMethodEnum = z.enum(["v60", "aeropress", "chemex", "espresso"]);

export const BrewSchema = z.object({
    id: z.string(),
    beans: z.string().min(3).max(40),
    method: BrewMethodEnum,
    rating: z.number().min(1).max(5).optional(),
    notes: z.string().max(20).optional(),
    brewedAt: z.union([z.string().datetime(), z.date()]),
});

export type Brew = z.infer<typeof BrewSchema>;

export const BrewCreateDto = BrewSchema.omit({ id: true });
export type BrewCreateDto = z.infer<typeof BrewCreateDto>;

export const BrewUpdateDto = BrewCreateDto.partial().extend({
    id: z.string(),
});
export type BrewUpdateDto = z.infer<typeof BrewUpdateDto>;

export const BrewResponseDto = BrewSchema;
export type BrewResponseDto = z.infer<typeof BrewResponseDto>;
