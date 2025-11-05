import { PrismaUserRepository } from "../repositories/prisma/users-repository";
import { GetUserProfile } from "../services/user/get-profile";

export function makeGetUserProfile(){
    const userRepository  = new PrismaUserRepository
    const getUserProfileService = new GetUserProfile(userRepository)

    return getUserProfileService
}