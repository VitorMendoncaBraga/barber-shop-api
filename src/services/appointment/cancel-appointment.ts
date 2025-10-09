import { Appointment } from "../../generated/prisma";
import { AppointmentRepository } from "../../repositories/appointment-repository";
import { ResourceNotFound } from "../errors/ResourceNotFound";

interface CancelAppointmentServiceRequest {
    id: string
}

export class CancelAppointmentService {
    constructor(private appointmentRepository: AppointmentRepository){}

    async execute({id}: CancelAppointmentServiceRequest ){
        const appointment = await this.appointmentRepository.findById(id)

        if(!appointment){
            throw new ResourceNotFound()
        }

        const canceledAppointment = this.appointmentRepository.cancel(id)
        return canceledAppointment

    }
}