import { Service } from "../../generated/prisma";
import { ServicesRepository } from "../../repositories/services-repository";
import { ServiceAlreadyExists } from "../errors/ServiceAlreadyExists";

interface CreateServicesServiceRequest{
    description: string,
    name: string,
    price: number
}

interface CreateServicesServiceResponse{
    service: Service
}

export class CreateServicesUseCase {
  private servicesRepository: ServicesRepository;
  constructor(servicesRepository: ServicesRepository) {
    this.servicesRepository = servicesRepository;
  }

  async execute({description,name,price}: CreateServicesServiceRequest): Promise<CreateServicesServiceResponse>{

    const hasServiceWithSameName = await this.servicesRepository.findByName(name)

    if(hasServiceWithSameName){
      throw new ServiceAlreadyExists()
    }

    const service = await this.servicesRepository.create({description,name,price})
    
    return {
      service
    }

  }
}
