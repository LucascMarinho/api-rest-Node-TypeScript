import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Create", () => {

  it("Cria registro", async () => {
    const res1 = await testServer.post("/cidades").send({ name: "Crato" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("Tenta criar um registro com name curto", async () => {
    const res1 = await testServer.post("/cidades").send({ name: "Cr" });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });
});
