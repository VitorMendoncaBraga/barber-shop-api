import { PrismaUserRepository } from "../repositories/prisma/users-repository";
import { AuthenticateService } from "../services/user/authenticate";

export function makeAuthenticateService(){
    const userRepository  = new PrismaUserRepository
    const authenticateService = new AuthenticateService(userRepository)

    return authenticateService
}