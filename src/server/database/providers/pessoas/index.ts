import * as count from "./count";
import * as create from "./create";
import * as getAll from "./getAll";
import * as getById from "./getById";
import * as updateByIdById from "./updateById";
import * as deleteByIdById from "./deleteById";

export const PessoasProvider = {
  ...count,
  ...create,
  ...getAll,
  ...getById,
  ...updateByIdById,
  ...deleteByIdById,
};
