import { User } from "../generated/prisma";
import { IUsersRepository } from "../repositories/usersRepository";
import { hash } from 'bcryptjs';

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
    private userRepostory: IUsersRepository;

    constructor(userRepository: IUsersRepository) {
        this.userRepostory = userRepository;
    }

    async execute({email,name,password,phone}: RegisterRequest): Promise<RegisterResponse>{
        const userAlreadyExists = await this.userRepostory.findByEmail(email);

        if(userAlreadyExists){
            throw new Error("User already exists.");
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