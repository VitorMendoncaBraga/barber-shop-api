import { PrismaAppointmentRepository } from "../repositories/prisma/appointment-repository";
import { PrismaBarberRepository } from "../repositories/prisma/barbers-repository";
import { GetBarberAppointmentsService } from "../services/appointment/get-barber-appointments";

export function makeGetBarberAppointmentsService() {
    const appointmentRepository = new PrismaAppointmentRepository()
    const barberRepository = new PrismaBarberRepository()
    const getBarberAppointmentsService = new GetBarberAppointmentsService(appointmentRepository, barberRepository)
    return getBarberAppointmentsService
}