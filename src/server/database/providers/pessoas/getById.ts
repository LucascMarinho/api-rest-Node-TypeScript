import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const getById = async (id: number): Promise<IPessoa | Error> => {

  try {
    const result = await Knex(ETableNames.pessoa).select("*").where("id", id).first();
    if (result) {
      return result;
    }
    console.log(result);
    return new Error("Erro ao atualizar o registro.");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};
