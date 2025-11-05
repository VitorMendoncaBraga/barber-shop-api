import { PrismaAppointmentRepository } from "../repositories/prisma/appointment-repository";
import { PrismaUserRepository } from "../repositories/prisma/users-repository";
import { GetUserNewAppointmentsService} from "../services/appointment/get-user-new-appointments";

export function makeGetUserNewAppointmentsService() {
    const appointmentRepository = new PrismaAppointmentRepository()
    const userRepository = new PrismaUserRepository()
    const getUserNewAppointmentsService = new GetUserNewAppointmentsService(appointmentRepository, userRepository)
    return getUserNewAppointmentsService
}