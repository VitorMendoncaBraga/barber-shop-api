import { PrismaAppointmentRepository } from "../repositories/prisma/appointment-repository";
import { PrismaUserRepository } from "../repositories/prisma/users-repository";
import { GetUserConcluedAppointmentsService} from "../services/appointment/get-user-conclued-appointments";

export function makeGetUserConcluedAppointmentsService() {
    const appointmentRepository = new PrismaAppointmentRepository()
    const userRepository = new PrismaUserRepository()
    const getUserConcluedAppointmentsService = new GetUserConcluedAppointmentsService(appointmentRepository, userRepository)
    return getUserConcluedAppointmentsService
}