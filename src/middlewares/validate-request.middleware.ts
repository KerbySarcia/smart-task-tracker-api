import { NextFunction, Request, Response } from "express";
import RequestValidators from "../interfaces/request-validator.interface";
import { ZodError } from "zod";

const validateRequest = (validators: RequestValidators) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.body) {
        res.locals.validatedBody = await validators.body.parseAsync(req.body);
      }

      if (validators.params) {
        res.locals.validatedParams = await validators.params.parseAsync(req.params);
      }

      if (validators.query) {
        res.locals.validatedQueries = await validators.query.parseAsync(req.query);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422).json(error);
        return;
      }
      next(error);
    }
  };
};

export default validateRequest;
