import { Router } from "express";
import multer from "multer";

import { CreateUSerController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUSerController = new CreateUSerController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUSerController.handle);

usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

export { usersRoutes };
