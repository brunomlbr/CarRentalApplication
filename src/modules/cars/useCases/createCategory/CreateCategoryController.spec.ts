import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Should be able to create a new category", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin", 8);

        await connection.query(`INSERT INTO USERS ( id, name, email, password, "isAdmin", created_at, driver_license) 
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXX' ) `);
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
        // await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
    });

    it("Should be able to create a new category", async () => {
        // await request(app).get("/cars/available").expect(200);
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin",
        });

        const { token } = responseToken.body;
        // console.log(responseToken.body.token);

        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category Supertest description",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(201);
    });

    it("Should not be able to create a new category with name exists", async () => {
        // await request(app).get("/cars/available").expect(200);
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin",
        });

        const { token } = responseToken.body;
        // console.log(responseToken.body.token);

        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category Supertest description",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
    });
});
