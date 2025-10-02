import { Service } from "../generated/prisma";
import { ServicesRepository } from "../repositories/servicesRepository";

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
    const service = await this.servicesRepository.create({description,name,price})
    return {
      service
    }

  }
}
