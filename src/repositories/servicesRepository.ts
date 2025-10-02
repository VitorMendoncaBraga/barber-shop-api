import { Prisma, Service } from "../generated/prisma";
import { EditServiceUseCaseRequest } from "../services/edit-service";

export interface ServicesRepository{
    findByName(name: string): Promise<Service | null>
    findById(id: string): Promise<Service | null>
    create({id,description,name,price}: Prisma.ServiceUncheckedCreateInput): Promise<Service>
    edit({id, description, name, price}: EditServiceUseCaseRequest): Promise<Service>
    delete(id: string): Promise<Service[]>
}