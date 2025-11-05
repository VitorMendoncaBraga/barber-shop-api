import { PrismaBarberRepository } from "../repositories/prisma/barbers-repository";
import { CreateBarberService } from "../services/barber/create-barber";
import { DeleteBarberService } from "../services/barber/delete-barber";


export function makeDeleteBarberService() {
  const barberRepository = new PrismaBarberRepository();
 
  const deleteBarberService = new DeleteBarberService(barberRepository)

  return deleteBarberService
}
