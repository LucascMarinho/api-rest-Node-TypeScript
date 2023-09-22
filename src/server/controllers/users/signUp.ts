import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

import { validation } from "../../shared/middlewares";
import { IUser } from "../../database/models";
import { UsersProvider } from "../../database/providers/users";

interface IBodyProps extends Omit<IUser, "id"> { }

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(6),
    email: yup.string().required().email().min(6),
    senha: yup.string().required().min(6)
  }))
}));


export const signUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await UsersProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }
  return res.status(StatusCodes.CREATED).json(result);
};
