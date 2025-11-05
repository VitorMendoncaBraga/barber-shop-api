import { PrismaServiceRepository} from "../repositories/prisma/services-repository";
import { CreateServicesUseCase } from "../services/service/create-services";

export function makeCreateServiceFactory(){
    const servicesRepository = new PrismaServiceRepository()
    const createServiceUseCase = new CreateServicesUseCase(servicesRepository)
    return createServiceUseCase
}