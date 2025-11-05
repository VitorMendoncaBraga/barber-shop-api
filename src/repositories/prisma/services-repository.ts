import { Prisma, Service, User } from "../../generated/prisma";
import { prisma } from "../../prisma/prisma";
import { EditServiceUseCaseRequest } from "../../services/service/edit-service";
import { ServicesRepository } from "../services-repository";

export class PrismaServiceRepository implements ServicesRepository {
    async create({ id, description, name, price }: Prisma.ServiceUncheckedCreateInput): Promise<Service> {
        const service = await prisma.service.create({
            data: {
                description,
                name,
                price
            }
        })

        return service
    }

    async delete(id: string) {
        const service = await prisma.service.delete({
            where: {
                id,
            }
        })

        return service
    }

    async edit({ id, description, name, price }: EditServiceUseCaseRequest) {
        const service = await prisma.service.update({
            where: {
                id,
            },

            data: {
                description,
                name,
                price
            }
        })

        return service
    }

    async findById(id: string): Promise<Service | null> {
        const service = await prisma.service.findUnique({
            where: {
                id,
            }
        })

        return service
    }

    async findByName(name: string): Promise<Service | null> {
        const service = await prisma.service.findUnique({
            where: {
                name,
            }
        })

        return service
    }

    async findMany(page: number, query?: string): Promise<Service[]> {
        if(query){
            const services = await prisma.service.findMany({
            where: {
                name: {
                    contains: query,
                    mode: "insensitive"
                }
            },

            skip: (page - 1) * 20,
            take: 20
        })

        return services
        }

        const services = await prisma.service.findMany({
            skip: (page - 1) * 20,
            take: 20
        })

        return services
    }
}