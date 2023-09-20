import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const deleteById = async (id: number): Promise<void | Error> => {

  try {
    const result = await Knex(ETableNames.cidade).where("id", id).del();
    if (result) return;

    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};
