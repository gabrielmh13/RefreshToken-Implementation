import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


export class AuthenticateUserController {
    async handle(req: Request, res: Response){
        const {username, password} = req.body

        if(!username || !password){
            throw new Error('Missing params!')
        }

        const authenticateUserUseCase = new AuthenticateUserUseCase()

        const {token, refreshToken} = await authenticateUserUseCase.execute({username, password})

        return res.json({token, refreshToken})

    }
}