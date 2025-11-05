import { PrismaServiceRepository} from "../repositories/prisma/services-repository";
import { GetServicesUseCase } from "../services/service/get-services";

export function makeGetServicesFactory(){
    const servicesRepository = new PrismaServiceRepository()
    const getServicesUseCase = new GetServicesUseCase(servicesRepository)
    return getServicesUseCase
}