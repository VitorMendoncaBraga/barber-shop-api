import { UsersRepository } from "../../repositories/users-repository";
import { ResourceNotFound } from "../errors/ResourceNotFound";

interface GetUserProfileRequest {
    id: string
}

export class GetUserProfile  {
    private userRepository: UsersRepository

    constructor(userRepository: UsersRepository) {
        this.userRepository = userRepository
    }

    async execute({id} :  GetUserProfileRequest) {
        const user = await this.userRepository.findById(id)

        if(!user){
            throw new ResourceNotFound()
        }

        return {
            user
        }


    }
}