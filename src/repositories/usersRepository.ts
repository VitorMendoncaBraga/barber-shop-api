import type { Prisma, User } from "../generated/prisma/index.js";

export interface IUsersRepository {
    findByEmail(email: string): Promise<User | null>;
    create({name,email,password,phone}: Prisma.UserUncheckedCreateInput): Promise<User>;
}