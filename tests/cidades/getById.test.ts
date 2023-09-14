import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe("Cidades - getById", () => {

  it("Pega usuário por ID", async () => {
    const res1 = await testServer.post("/cidades").send({ name: "Crato" });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBusca = await testServer.get(`/cidades/${res1.body}`);
    expect(resBusca.statusCode).toEqual(StatusCodes.OK);
    expect(resBusca.body).toHaveProperty("name");
  });

  it("pega usuário que não existe", async () => {
    const res1 = await testServer.get("/cidades/999999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
