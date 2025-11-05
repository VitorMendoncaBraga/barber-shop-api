import { PrismaBarberRepository } from "../repositories/prisma/barbers-repository";
import { GetBarberService } from "../services/barber/get-barber";


export function makeGetBarberService() {
  const barberRepository = new PrismaBarberRepository();
 
  const getBarberService = new GetBarberService(barberRepository)

  return getBarberService
}
