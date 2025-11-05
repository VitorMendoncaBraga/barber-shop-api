import { PrismaAppointmentRepository } from "../repositories/prisma/appointment-repository";
import { CancelAppointmentService} from "../services/appointment/cancel-appointment";

export function makeCancelAppointmentService() {
  const appointmentRepository = new PrismaAppointmentRepository();

  const cancelAppointmentService = new CancelAppointmentService(
    appointmentRepository,
  );

  return cancelAppointmentService
}
