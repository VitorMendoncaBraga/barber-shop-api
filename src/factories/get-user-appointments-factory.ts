import { PrismaAppointmentRepository } from "../repositories/prisma/appointment-repository";
import { PrismaUserRepository } from "../repositories/prisma/users-repository";
import { GetUserAppointmentsService } from "../services/appointment/get-user-appointments";

export function makeGetUserAppointmentsService() {
    const appointmentRepository = new PrismaAppointmentRepository()
    const userRepository = new PrismaUserRepository()
    const getUserAppointmentsService = new GetUserAppointmentsService(appointmentRepository, userRepository)
    return getUserAppointmentsService
}