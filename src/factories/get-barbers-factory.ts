import { PrismaBarberRepository } from "../repositories/prisma/barbers-repository";
import { CreateBarberService } from "../services/barber/create-barber";
import { GetBarbersService } from "../services/barber/get-barbers";


export function makeGetBarbersService() {
  const barberRepository = new PrismaBarberRepository();
 
  const getBarbersService = new GetBarbersService(barberRepository)

  return getBarbersService
}
