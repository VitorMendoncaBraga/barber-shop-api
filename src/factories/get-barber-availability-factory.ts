import { PrismaAppointmentRepository } from "../repositories/prisma/appointment-repository";
import { PrismaBarberRepository } from "../repositories/prisma/barbers-repository";
import { GetBarberAvailabilityService } from "../services/appointment/get-barber-availability";
import { GetBarberService } from "../services/barber/get-barber";


export function makeGetBarberAvailabilityService() {
  const barberRepository = new PrismaBarberRepository();
  const appointmentRepository = new PrismaAppointmentRepository()
 
  const getBarberAvailabilityService = new GetBarberAvailabilityService(appointmentRepository, barberRepository)

  return  getBarberAvailabilityService
}
