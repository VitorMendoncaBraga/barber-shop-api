import type { Prisma, User } from "../../generated/prisma";
import { UsersRepository } from "../usersRepository";
import { randomUUID } from "node:crypto";

export class InMemoryUserRepository implements UsersRepository {
    private items: User[] = [];
    
    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(user => user.email === email);
        return user || null;
    }

    async create({id,  name, email, password, phone }: Prisma.UserUncheckedCreateInput): Promise<User> {

        const user: User = {
            name,
            id: id || randomUUID(),
            email,
            password,
            phone,
            createdAt: new Date(),
          
        }

        this.items.push(user);
        return user;
    }

    async edit(id: string,name: string, email: string, phone: string ) {
        const userIndex = this.items.findIndex((user) => user.id == id)
        const user = this.items[userIndex] = {
            ...this.items[userIndex],
            name,
            email,
            phone
        }
        return user
    }

    async findById(id: string): Promise<User | null> {
        const user = this.items.find((user) => user.id == id)
        if(!user){
            return null
        }

        return user
    }

}