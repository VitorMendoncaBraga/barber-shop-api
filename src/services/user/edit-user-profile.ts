import { User } from "../../generated/prisma";
import { UsersRepository } from "../../repositories/users-repository";
import { ResourceNotFound } from "../errors/ResourceNotFound";
import { UserAlreadyExists } from "../errors/UserAlreadyExists";

interface EditUserServiceProfileRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface EditUserServiceProfileResponse {
  userWithoutPassword: {
    name: string,
    email: string,
    phone: string,
    createdAt: Date
  };
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

    const thisEmailAlreadyExists = await this.userRepository.findByEmail(email)

    if(userExists.email != email && thisEmailAlreadyExists){
      throw new UserAlreadyExists()
    }

    const user = await this.userRepository.edit(id, name, email, phone);
    const userWithoutPassword = {
      ...user,
      password: undefined
    }
    return {
      userWithoutPassword
    };
  }
}
