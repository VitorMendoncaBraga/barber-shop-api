import { randomUUID } from "node:crypto";
import { Prisma, Service } from "../../generated/prisma";
import { ServicesRepository } from "../servicesRepository";

export class InMemoryServiceRepository implements ServicesRepository{

    private items: Service[] = []

    async create({ description, name, price }: Prisma.ServiceUncheckedCreateInput) {
        const service: Service = {
            id: randomUUID(),
            createdAt: new Date(),
            description,
            name,
            price
        }        

        await this.items.push(service)

        return service
    }

    async findByName(name: string): Promise<Service | null> {
        const service = this.items.find((service) => service.name == name)

        if(!service){
            return null
        }

        return service
    }

    async delete(id: string) {
        this.items.filter((service) => service.id != id)
    }

    async edit({ id, description, name, price }: Prisma.ServiceUncheckedCreateInput) {
        const serviceIndex = this.items.findIndex((item) => item.id == id)
        this.items[serviceIndex] = {
            ...this.items[serviceIndex],
            description,
            name,
            price
        }

        return this.items[serviceIndex] 
    }
}