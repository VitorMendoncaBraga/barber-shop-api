import { PrismaUserRepository } from "../repositories/prisma/users-repository";
import { RegisterService } from "../services/user/register";

export function makeRegisterFactory() {
    const userRepository = new PrismaUserRepository()
    const registerService = new RegisterService(userRepository)
    return registerService
}