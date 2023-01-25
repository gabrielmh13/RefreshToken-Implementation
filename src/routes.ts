import { Router } from "express";
import { CreateUserController } from "./useCases/CreateUser/CreateUserController";
import { AuthenticateUserController } from "./useCases/AuthenticateUser/AuthenticateUserController";
import { ListUsersController } from "./useCases/ListUsers/ListUsersController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { RefreshTokenUserController } from "./useCases/RefreshTokenUser/RefreshTokenUserController";

const router = Router()

const createUserController = new CreateUserController()
const listUsersController = new ListUsersController()
const authenticateUsersController = new AuthenticateUserController()
const refreshTokenUserController = new RefreshTokenUserController()

router.post("/users", createUserController.handle)
router.get("/users", ensureAuthenticated, listUsersController.handle)

router.post("/refresh-token", refreshTokenUserController.handle)

router.post("/authenticate", authenticateUsersController.handle)

export {router}