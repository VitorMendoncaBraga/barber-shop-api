import { Service } from "../../generated/prisma";
import { ServicesRepository } from "../../repositories/services-repository";
import { ResourceNotFound } from "../errors/ResourceNotFound";
import { ServiceAlreadyExists } from "../errors/ServiceAlreadyExists";

export interface EditServiceUseCaseRequest{
    id: string
    name: string,
    description: string,
    price: number
}

interface EditServiceUseCaseResponse{
    service: Service
}

export class EditServiceUseCase{
    private serviceRepository: ServicesRepository
    constructor(serviceRepository: ServicesRepository){
        this.serviceRepository = serviceRepository
    }

    async execute({id,description,name,price}: EditServiceUseCaseRequest): Promise<EditServiceUseCaseResponse>{
        const serviceExists = await this.serviceRepository.findById(id)

        const serviceWithSameName = await this.serviceRepository.findByName(name)

        if(serviceWithSameName){
            throw new ServiceAlreadyExists()
        }
        
        if(!serviceExists){
            throw new ResourceNotFound()
        }
        
        const service = await this.serviceRepository.edit({id, description,name,price})
        return {
            service
        }
    }
}