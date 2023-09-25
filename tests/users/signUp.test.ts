import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Users - signUp", () => {

  it("Cadastra user", async () => {
    const res1 = await testServer.post("/cadastrar").send({ senha: "123456", name: "Lucas Teste", email: "teste@teste.com" });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Tenta cadastrar user com email duplicado", async () => {
    const res1 = await testServer.post("/cadastrar").send({ senha: "123456", name: "Lucas Teste", email: "teste@teste.com" });
    const res2 = await testServer.post("/cadastrar").send({ senha: "qwert123", name: "Lucas Teste1", email: "teste@teste.com" });

    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty("errors.default");
  });
});
