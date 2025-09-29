import type { User } from "../generated/prisma/index.js";

export interface IUsersRepository {
    findByEmail(email: string): Promise<User | null>;
    create({name,email,password,phone}: Omit<User,"id" | "createdAt" | "role">): Promise<User>;
}