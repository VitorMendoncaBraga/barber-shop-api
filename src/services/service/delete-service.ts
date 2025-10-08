import { Service } from "../../generated/prisma";
import { ServicesRepository } from "../../repositories/services-repository";
import { ResourceNotFound } from "../errors/ResourceNotFound";

interface DeleteServiceUseCaseRequest{
    id: string
}

interface DeleteServiceUseCaseResponse{
    services: Service[]
}


export class DeleteServiceUseCase{
    private serviceRepository: ServicesRepository
    constructor(serviceRepository: ServicesRepository){
        this.serviceRepository = serviceRepository
    }

    async execute({id}: DeleteServiceUseCaseRequest): Promise<DeleteServiceUseCaseResponse>{
        const service = await this.serviceRepository.findById(id)

        if(!service){
            throw new ResourceNotFound()
        }

        const services = await this.serviceRepository.delete(id)
        
        return {
            services,
        }
    }
}