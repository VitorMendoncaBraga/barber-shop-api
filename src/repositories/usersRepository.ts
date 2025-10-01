import type { Prisma, User } from "../generated/prisma/index.js";

export interface UsersRepository {
    findByEmail(email: string): Promise<User | null>;
    create({name,email,password,phone}: Prisma.UserUncheckedCreateInput): Promise<User>;
    edit(id: string, name: string, email: string, phone: string): Promise<User>
    findById(id: string): Promise<User | null>
}