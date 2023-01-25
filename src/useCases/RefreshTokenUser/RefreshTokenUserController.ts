import { Request, Response } from "express";
import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";

export class RefreshTokenUserController {
    async handle(req: Request, res: Response){
        const {refresh_token} = req.body

        const refreshTokenUserCase = new RefreshTokenUserUseCase()
        const token = await refreshTokenUserCase.execute(refresh_token)

        return res.json({token})
    }
}