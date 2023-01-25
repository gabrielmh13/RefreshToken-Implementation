import { client } from "../../prisma/client";

export class ListUsersUseCase {
    async execute(){
        const users = await client.user.findMany()

        return users
    }
}