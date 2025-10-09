import { randomUUID } from "node:crypto";
import { AppointmentService } from "../../generated/prisma";
import { AppointmentServiceRepository } from "../appointment-service-repository";

export class InMemoryAppointmentServiceRepository implements AppointmentServiceRepository{

    public items: AppointmentService[] = []

    async create( serviceId: string, appointmentId: string, id?: string) {
        const newAppointmentService : AppointmentService = {
            id: id || randomUUID(),
            appointmentId,
            serviceId,
        }

        this.items.push(newAppointmentService)

        return newAppointmentService
    }
}