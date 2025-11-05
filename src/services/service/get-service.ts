import { Product, Service } from "../../generated/prisma";
import { ServicesRepository } from "../../repositories/services-repository";
import z from 'zod'
import { ResourceNotFound } from "../errors/ResourceNotFound";

interface GetServiceUseCaseRequest {
    id: string
}

interface GetServiceUseCaseResponse {
    service: Service
}


export class GetServiceUseCase {
    private serviceRepository: ServicesRepository
    
    constructor(serviceRepository: ServicesRepository){
        this.serviceRepository = serviceRepository
    }

    async execute({id}: GetServiceUseCaseRequest) : Promise<GetServiceUseCaseResponse> { 
        const service = await this.serviceRepository.findById(id)

        if(!service) {
            throw new ResourceNotFound()
        }

        return {
            service
        }
    }
}