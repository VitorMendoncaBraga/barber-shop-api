import { PrismaBarberRepository } from "../repositories/prisma/barbers-repository";
import { CreateBarberService } from "../services/barber/create-barber";


export function makeCreateBarberService() {
  const barberRepository = new PrismaBarberRepository();
 
  const createBarberService = new CreateBarberService(barberRepository)

  return createBarberService
}
