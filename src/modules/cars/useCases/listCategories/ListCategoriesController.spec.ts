import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("List Categories", () => {
  beforeAll(async () => {
    // connection = await createConnection();
    // await connection.runMigrations();
    // const id = uuidV4();
    // const password = await hash("admin", 8);
    // await connection.query(`INSERT INTO USERS ( id, name, email, password, "isAdmin", created_at, driver_license)
    // values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXX' ) `);
  });

  afterAll(async () => {
    // await connection.dropDatabase();
    // await connection.close();
    // await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });

  it("Should be able to list categories", async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(`INSERT INTO USERS ( id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXX' ) `);
    // await request(app).get("/cars/available").expect(200);
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;
    // const { token } = responseToken.body;
    // console.log(responseToken.body.token);

    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest description",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest2",
        description: "Category Supertest description2",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest3",
        description: "Category Supertest description3",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    const response = await request(app).get("/categories");
    // console.log(response.body);
    await connection.dropDatabase();
    await connection.close();
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category Supertest");
  });
});
