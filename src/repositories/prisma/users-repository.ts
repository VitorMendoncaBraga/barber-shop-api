import { Prisma, User } from "../../generated/prisma";
import { prisma } from "../../prisma/prisma";
import { UsersRepository } from "../users-repository";

export class PrismaUserRepository implements UsersRepository {
    async create({ name, email, password, phone }: Prisma.UserUncheckedCreateInput){
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                phone
            }
        })

        return user
    }

    async edit(id: string, name: string, email: string, phone: string) {
        const user = await prisma.user.update({
            where: {
                id,
            },

            data: {
                name,
                email,
                phone
            }
        })

        return user
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        return user
    }

    async findById(id: string){
        const user = await prisma.user.findUnique({
            where: {
               id,
            }
        })

        return user
    }
    
}