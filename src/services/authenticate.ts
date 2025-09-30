import { compare } from "bcryptjs";
import { IUsersRepository } from "../repositories/usersRepository";
import { InvalidCredentials } from "./errors/InvalidCredentials";
import fastify from "fastify";
import { User } from "../generated/prisma";

interface AuthenticateServiceRequest{
    email: string,
    password: string
}

interface AuthenticateServiceResponse{
    user: User
}

export class AuthenticateService{
    private usersRepository: IUsersRepository

    constructor(userRepository: IUsersRepository){
        this.usersRepository = userRepository
    }

    async execute({email,password}: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse>{

        const user = await this.usersRepository.findByEmail(email)  

        if(!user){
            throw new InvalidCredentials()
        }    

        const doesPasswordsMatches = await compare(password, user.password)  

        if(!doesPasswordsMatches){
            throw new InvalidCredentials()
        }   
        
        return {
            user
        }
    }
}