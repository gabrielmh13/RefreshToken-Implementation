import { client } from "../prisma/client";
import dayjs from "dayjs";

export class GenerateRefreshToken {
    async execute(userId: string){
        const expiresIn = dayjs().add(30, 'seconds').unix()

        await client.refreshToken.deleteMany({
            where: {
                userId
            }
        })

        const refreshToken = await client.refreshToken.create({
            data: {
                userId,
                expiresIn
            }
        })

        return refreshToken
    }
}