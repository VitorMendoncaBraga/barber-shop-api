import { PrismaServiceRepository} from "../repositories/prisma/services-repository";
import { DeleteServiceUseCase } from "../services/service/delete-service";

export function makeDeleteServiceFactory(){
    const servicesRepository = new PrismaServiceRepository()
    const deleteServiceUseCase = new DeleteServiceUseCase(servicesRepository)
    return deleteServiceUseCase
}