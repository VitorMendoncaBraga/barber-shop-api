import { User } from "../../generated/prisma";
import { UsersRepository } from "../../repositories/users-repository";
import { hash } from 'bcryptjs';
import { UserAlreadyExists } from "../errors/UserAlreadyExists";

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    phone: string;
}

interface RegisterResponse {
    user: User
}

export class RegisterService {
    private userRepostory: UsersRepository;

    constructor(userRepository: UsersRepository) {
        this.userRepostory = userRepository;
    }

    async execute({email,name,password,phone}: RegisterRequest): Promise<RegisterResponse>{
        const userAlreadyExists = await this.userRepostory.findByEmail(email);

        if(userAlreadyExists){
            throw new UserAlreadyExists();
        }

        const password_hashed = await hash(password, 10);

        const user = await this.userRepostory.create({
            name,
            email,
            password: password_hashed,
            phone
        });

        return {
            user
        };

    }
}