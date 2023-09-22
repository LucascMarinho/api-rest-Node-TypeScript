import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe("Pessoas - DeleteById", () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({ name: "teste" });

    cidadeId = resCidade.body;
  });
  it("apaga registro", async () => {
    const res1 = await testServer.post("/pessoas").send({ name: "João", email: "teste@teste.com", cidadeId: 2 });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testServer.delete(`/cidades/${res1.body}`).send();
    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);

  });

  it("Tenta apagar um registro que não existe", async () => {
    const res1 = await testServer.delete("/cidades/999999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
