import dayjs from "dayjs";
import { client } from "../../prisma/client";
import { GenerateAccessToken } from "../../provider/GenerateAccessToken";

export class RefreshTokenUserUseCase {
    async execute(refresh_token: string){
        const refreshToken = await client.refreshToken.findFirst({
            where: {
                id: refresh_token
            }
        })

        if(!refreshToken){
            throw new Error("Invalid refresh token!")
        }

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))

        if(refreshTokenExpired){
            await client.refreshToken.deleteMany({
                where: {
                    userId: refreshToken.userId
                }
            })

            throw new Error("Invalid refresh token!")
        }

        const generateAccessToken = new GenerateAccessToken()
        const token = await generateAccessToken.execute(refreshToken.userId)

        return token
    }
}