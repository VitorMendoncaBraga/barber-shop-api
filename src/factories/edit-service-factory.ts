import { PrismaServiceRepository} from "../repositories/prisma/services-repository";
import { EditServiceUseCase } from "../services/service/edit-service";

export function makeEditServiceFactory(){
    const servicesRepository = new PrismaServiceRepository()
    const editServiceUseCase = new EditServiceUseCase(servicesRepository)
    return editServiceUseCase
}