import { compare } from "bcryptjs";
import { UsersRepository } from "../repositories/usersRepository";
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
    private usersRepository: UsersRepository

    constructor(userRepository: UsersRepository){
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