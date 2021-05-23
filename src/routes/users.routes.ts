import { Router } from "express";

import { CreateUSerController } from "../modules/accounts/useCases/createUser/CreateUserController";

const usersRoutes = Router();

const createUSerController = new CreateUSerController();

usersRoutes.post("/", createUSerController.handle);

export { usersRoutes };
