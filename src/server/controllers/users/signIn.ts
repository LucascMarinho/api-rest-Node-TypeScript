import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

import { validation } from "../../shared/middlewares";
import { IUser } from "../../database/models";
import { UsersProvider } from "../../database/providers/users";

interface IBodyProps extends Omit<IUser, "id" | "name"> { }

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email().min(6),
    senha: yup.string().required().min(6)
  }))
}));


export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

  const { email, senha } = req.body;

  const result = await UsersProvider.getByEmail(email);
  console.log(result);
  if (result instanceof Error || result.senha.toString() !== senha) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Não foi possível validar as credenciais."
      }
    });
  } else {
    return res.status(StatusCodes.OK).json({ accessToken: "test.teste.teste" });
  }
};
