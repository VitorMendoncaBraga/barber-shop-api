import { PrismaAppointmentRepository } from "../repositories/prisma/appointment-repository";
import { PrismaBarberRepository } from "../repositories/prisma/barbers-repository";
import { PrismaUserRepository } from "../repositories/prisma/users-repository";
import { CreateAppointmentService } from "../services/appointment/create-appointment";

export function makeCreateAppointmentService() {
  const appointmentRepository = new PrismaAppointmentRepository();
  const usersRepository = new PrismaUserRepository();
  const barberRepository = new PrismaBarberRepository();
  const createAppointmentService = new CreateAppointmentService(
    appointmentRepository,
    barberRepository,
    usersRepository
  );

  return createAppointmentService
}
