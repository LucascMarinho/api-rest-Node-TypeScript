import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Users - singIn", () => {
  it("Tenta validar credenciais", async () => {
    const res1 = await testServer.post("/cadastrar").send({ senha: "teste123", name: "Lucas Teste", email: "teste5@teste.com" });
    const res2 = await testServer.post("/entrar").send({ senha: "teste123", email: "teste5@teste.com" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(res2.statusCode).toEqual(StatusCodes.OK);
    expect(res2.body).toHaveProperty("accessToken");
  });
});
