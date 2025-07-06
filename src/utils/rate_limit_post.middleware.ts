import { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import { config } from "../config/index.js"; // шлях під себе

const limiter = rateLimit(config.postRateLimit);

export function rateLimitPostMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.method === "POST") {
        return limiter(req, res, next);
    }
    next();
}
