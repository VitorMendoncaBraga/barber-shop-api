import { User } from "../../generated/prisma";
import { UsersRepository } from "../../repositories/users-repository";
import { ResourceNotFound } from "../errors/ResourceNotFound";

interface EditUserServiceProfileRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface EditUserServiceProfileResponse {
  user: User;
}

export class EditUserProfileService {
  private userRepository: UsersRepository;
  constructor(userRepository: UsersRepository) {
    this.userRepository = userRepository;
  }

  async execute({
    id,
    email,
    name,
    phone,
  }: EditUserServiceProfileRequest): Promise<EditUserServiceProfileResponse> {
    const userExists = await this.userRepository.findById(id);
    if (!userExists) {
      throw new ResourceNotFound();
    }
    const user = await this.userRepository.edit(id, name, email, phone);
    return {
      user,
    };
  }
}
