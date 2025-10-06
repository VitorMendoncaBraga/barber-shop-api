import { Product, Service } from "../../generated/prisma";
import { ServicesRepository } from "../../repositories/services-repository";
import z from 'zod'

interface GetServiceUseCaseRequest {
    query?: string,
    page: number
}

interface GetServiceUseCaseResponse {
    services: Service[]
}


export class getServiceUseCase {
    private serviceRepository: ServicesRepository
    
    constructor(serviceRepository: ServicesRepository){
        this.serviceRepository = serviceRepository
    }

    async execute({page,query}: GetServiceUseCaseRequest) : Promise<GetServiceUseCaseResponse> { 
        const services = await this.serviceRepository.findMany(page, query)
        return {
            services
        }
    }
}