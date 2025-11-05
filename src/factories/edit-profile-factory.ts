import { PrismaUserRepository } from "../repositories/prisma/users-repository";
import { EditUserProfileService } from "../services/user/edit-user-profile";

export function makeEditProfile() {
    const userRepository = new PrismaUserRepository()
    const editProfileService = new EditUserProfileService(userRepository)
    return editProfileService
}