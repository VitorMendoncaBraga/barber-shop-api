import { randomUUID } from "node:crypto";
import { Prisma, Product, Service } from "../../generated/prisma";
import { ServicesRepository } from "../services-repository";

export class InMemoryServiceRepository implements ServicesRepository{

    public items: Service[] = []

    async create({ id, description, name, price }: Prisma.ServiceUncheckedCreateInput) {
        const service: Service = {
            id: id || randomUUID(),
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
        this.items = this.items.filter((service) => service.id != id)
        return this.items
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

    async findById(id: string): Promise<Service | null> {
        const service = this.items.find((service) => service.id == id)
        if(!service){
            return null
        }

        return service
    }

    async findMany(page: number, query?: string): Promise<Service[]> {
        if(query){
            return this.items.filter((item) => item.name.includes(query)).slice((page - 1) * 20, page * 20)
        }

        return this.items.slice((page - 1) * 20, page  * 20)
    }
}