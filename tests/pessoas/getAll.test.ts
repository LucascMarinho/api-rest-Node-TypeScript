import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe("Pessoas - getAll", () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({ name: "teste" });

    cidadeId = resCidade.body;
  });

  it("Busca todos os registros", async () => {
    const res1 = await testServer.post("/pessoas").send({ name: "João", email: "teste@teste.com", cidadeId: 1 });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBusca = await testServer.get("/pessoas").send();
    expect(Number(resBusca.header["x-total-count"])).toBeGreaterThan(0);
    expect(resBusca.statusCode).toEqual(StatusCodes.OK);
    expect(resBusca.body.length).toBeGreaterThan(0);
  });
});
