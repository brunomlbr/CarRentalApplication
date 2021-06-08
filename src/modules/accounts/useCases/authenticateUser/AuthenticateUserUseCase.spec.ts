import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUSerDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUSerUseCase";
import { AuthenticateUSerUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUSerUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUsecase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUSerUseCase(
            usersRepositoryInMemory
        );
        createUserUsecase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "123456789",
            email: "user@test.com",
            password: "1234",
            name: "User Test",
        };
        await createUserUsecase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        // console.log(result);
        expect(result).toHaveProperty("token");
    });

    it("Should not be able to authenticate an nonexistent user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "1234",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "9999",
                email: "user@user.com",
                password: "1234",
                name: "User Test Error",
            };

            await createUserUsecase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPassword",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
