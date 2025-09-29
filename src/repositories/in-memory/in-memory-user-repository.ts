import type { Prisma, User } from "../../generated/prisma";
import { IUsersRepository } from "../usersRepository";
import { randomUUID } from "node:crypto";

export class InMemoryUserRepository implements IUsersRepository {
    private items: User[] = [];
    
    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(user => user.email === email);
        return user || null;
    }

    async create({ name, email, password, phone }: Prisma.UserUncheckedCreateInput): Promise<User> {
        
        const user = {
            name,
            id: randomUUID(),
            email,
            password,
            phone,
            createdAt: new Date(),
            role: "client" as User["role"]
        }

        this.items.push(user);
        return user;
    }

}