import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe("Pessoas - getById", () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({ name: "teste" });

    cidadeId = resCidade.body;
  });

  it("Pega usuário por ID", async () => {
    const res1 = await testServer.post("/pessoas").send({ name: "João", email: "teste@teste.com", cidadeId: 1 });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBusca = await testServer.get(`/cidades/${res1.body}`);
    expect(resBusca.statusCode).toEqual(StatusCodes.OK);
    expect(resBusca.body).toHaveProperty("name");
  });

  it("pega usuário que não existe", async () => {
    const res1 = await testServer.get("/pessoas/999999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
