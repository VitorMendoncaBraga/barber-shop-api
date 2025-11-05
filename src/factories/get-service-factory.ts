import { PrismaServiceRepository} from "../repositories/prisma/services-repository";
import { GetServiceUseCase } from "../services/service/get-service";

export function makeGetServiceFactory(){
    const servicesRepository = new PrismaServiceRepository()
    const getServiceUseCase = new GetServiceUseCase(servicesRepository)
    return getServiceUseCase
}