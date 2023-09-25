import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUser } from "../../models";

export const getByEmail = async (email: string): Promise<IUser | Error> => {

  try {
    const result = await Knex(ETableNames.user).select("*").where("email", email).first();
    if (result) {
      return result;
    }
    return new Error("Erro ao atualizar o registro.");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};
