import { PrismaBarberRepository } from "../repositories/prisma/barbers-repository";
import { CreateBarberService } from "../services/barber/create-barber";
import { EditBarberService } from "../services/barber/edit-barber";


export function makeEditBarberService() {
  const barberRepository = new PrismaBarberRepository();
 
  const editBarberService = new EditBarberService(barberRepository)

  return editBarberService
}
