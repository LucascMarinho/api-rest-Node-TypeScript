import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Pessoas - Create", () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({ name: "teste" });

    cidadeId = resCidade.body;
  });

  it("Cria registro", async () => {
    const res1 = await testServer.post("/pessoas").send({ name: "João", email: "teste@teste.com", cidadeId: 1 });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("Tenta criar um registro com name curto", async () => {
    const res1 = await testServer.post("/pessoas").send({ name: "Jo", email: "teste@teste.com", cidadeId: 1 });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });

  it("Tenta criar um registro com email sem tipo email", async () => {
    const res1 = await testServer.post("/pessoas").send({ name: "João", email: "teste", cidadeId: 1 });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });

  it("Tenta criar um registro com cidade inexistente", async () => {
    const res1 = await testServer.post("/pessoas").send({ name: "João", email: "teste@teste.com", cidadeId: 999999 });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
