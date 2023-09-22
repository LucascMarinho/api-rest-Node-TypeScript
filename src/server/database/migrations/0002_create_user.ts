import { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.user, table => {
    table.bigIncrements("id").primary().index();
    table.string("name").notNullable().checkLength(">", 5);
    table.string("email").index().unique().notNullable().checkLength(">", 6);
    table.bigInteger("senha").notNullable().checkLength(">", 5);

    table.comment("Tabela usada para armazenar users do sistema.");
  })
    .then(() => {
      console.log(`# Create table ${ETableNames.user}`);
    });
}


export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.user)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.user}`);
    });
}
