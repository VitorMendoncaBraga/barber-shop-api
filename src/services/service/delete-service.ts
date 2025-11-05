import { Service } from "../../generated/prisma";
import { ServicesRepository } from "../../repositories/services-repository";
import { ResourceNotFound } from "../errors/ResourceNotFound";

interface DeleteServiceUseCaseRequest{
    id: string
}

interface DeleteServiceUseCaseResponse{
    service: Service
}


export class DeleteServiceUseCase{
    private serviceRepository: ServicesRepository
    constructor(serviceRepository: ServicesRepository){
        this.serviceRepository = serviceRepository
    }

    async execute({id}: DeleteServiceUseCaseRequest): Promise<DeleteServiceUseCaseResponse>{
        const serviceExists = await this.serviceRepository.findById(id)

        if(!serviceExists){
            throw new ResourceNotFound()
        }

        const service = await this.serviceRepository.delete(id)
        
        return {
            service,
        }
    }
}