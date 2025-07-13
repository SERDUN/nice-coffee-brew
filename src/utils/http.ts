import { Response } from 'express';

export function respondCreated(res: Response, data: unknown) {
    return res.status(201).json(data);
}

export function respondOk(res: Response, data: unknown) {
    return res.status(200).json(data);
}

export function respondNoContent(res: Response) {
    return res.status(204).send();
}
