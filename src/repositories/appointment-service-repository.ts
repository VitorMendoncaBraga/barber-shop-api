import { AppointmentService } from "../generated/prisma";

export interface AppointmentServiceRepository {
    create( serviceId: string, appointmentId: string ,id?: string): Promise<AppointmentService>
}