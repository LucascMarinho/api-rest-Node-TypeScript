import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";

interface ICidade {
  nome: string;
}

export const createValidation = validation((getSchema) => ({
  body: yup.object().shape({
    nome: yup.string().required().min(3)
  })
}));


export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {

  console.log(req.body);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Ainda não implementado.");
};
