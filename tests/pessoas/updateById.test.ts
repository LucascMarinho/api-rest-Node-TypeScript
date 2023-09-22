import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Pessoas - updateById", () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({ name: "teste" });

    cidadeId = resCidade.body;
  });

  it("Atualiza registro", async () => {
    const res1 = await testServer.post("/pessoas").send({ name: "João", email: "teste@teste.com", cidadeId: 1 });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer.put(`/pessoas/${res1.body}`).send({ id: res1.body, name: "Fortaleza", email: "teste2@teste2.com", cidadeId: 3 });
    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tenta atualizar registro inexistente", async () => {
    const res1 = await testServer.put("/pessoas/999999").send({ id: 999999, name: "Joãoaas", email: "testsd@teste.com", cidadeId: 7 });
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
