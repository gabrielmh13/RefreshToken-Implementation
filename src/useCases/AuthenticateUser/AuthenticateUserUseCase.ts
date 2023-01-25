import { compare } from "bcryptjs"
import { client } from "../../prisma/client"
import { GenerateAccessToken } from "../../provider/GenerateAccessToken"
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken"


interface IUserRequest {
    username: string
    password: string
}

export class AuthenticateUserUseCase {
    async execute({username, password}: IUserRequest){
        const user = await client.user.findFirst({
            where: {
                username
            }
        })

        if(!user){
            throw new Error("User or password are incorrect!")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("User or password are incorrect!")
        }
        
        const generatAccessToken = new GenerateAccessToken()
        const token = await generatAccessToken.execute(user.id)

        await client.refreshToken.deleteMany({
            where: {
                userId: user.id
            }
        })

        const generateRefreshToken = new GenerateRefreshToken()
        const refreshToken = await generateRefreshToken.execute(user.id)


        return {token, refreshToken}
    }
}