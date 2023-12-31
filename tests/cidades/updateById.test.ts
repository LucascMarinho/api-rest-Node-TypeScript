import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - updateById", () => {

  it("Atualiza registro", async () => {
    const res1 = await testServer.post("/cidades").send({ name: "Crato" });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer.put(`/cidades/${res1.body}`).send({ id: res1.body, name: "Fortaleza" });
    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tenta atualizar registro inexistente", async () => {
    const res1 = await testServer.put("/cidades/999999").send({ id: 999999, name: "Fortaleza" });
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
