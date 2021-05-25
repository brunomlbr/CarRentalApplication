import { Router } from "express";

import { AuthenticateUSerController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUSerController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateRoutes };
