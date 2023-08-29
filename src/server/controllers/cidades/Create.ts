import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

interface ICidade {
  nome: string;
}
interface IFilter {
  filter?: string;
}

export const validator = validation({
  body: yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(3)
  }),
  query: yup.object().shape({
    filter: yup.string().required().min(3)
  })
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {

  console.log(req.body);

  return res.send("Cidade criada!");
};
