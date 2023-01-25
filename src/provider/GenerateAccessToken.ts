import { sign } from "jsonwebtoken";

export class GenerateAccessToken {
    async execute(userId: string){
        const token = sign({}, process.env.SECRET_KEY! , {
            subject: userId,
            expiresIn: "15s"
        })

        return token
    }
}