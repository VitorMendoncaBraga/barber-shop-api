import { Prisma, Service } from "../generated/prisma";

export interface ServicesRepository{
    findByName(name: string): Promise<Service | null>
    create({description,name,price}: Prisma.ServiceUncheckedCreateInput): Promise<Service>
    edit({id, description, name, price}: Prisma.ServiceUncheckedCreateInput): Promise<Service>
    delete(id: string): Promise<void>
}