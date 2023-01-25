import { client } from "../../prisma/client"
import { hash } from "bcryptjs"

interface IUserRequest {
    name: string
    username: string
    password: string
}

export class CreateUserUseCase {
    async execute ({name, username, password}: IUserRequest) {
        const user = await client.user.findFirst({
            where: {
                username
            }
        })

        if(user){
            throw new Error(`User ${user.username} already exists`)
        }

        const passwordHash = await hash(password, 8)

        const userCreated = await client.user.create({
            data: {
                name,
                username,
                password: passwordHash
            }
        })

        return userCreated
    }
}