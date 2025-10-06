import { Appointment } from "../../generated/prisma";
import { AppointmentRepository } from "../../repositories/appointment-repository";

interface CreateAppointmentServiceRequest{
    userId: string,
    barberId: string,
    date: Date,
}

interface CreateAppointmentServiceResponse{
   appointment: Appointment
}

export class CreateAppointmentService {
    private appointmentsRepository: AppointmentRepository

    constructor(appointmentsRepository: AppointmentRepository){
        this.appointmentsRepository = appointmentsRepository
    }

    async execute({barberId,date,userId} : CreateAppointmentServiceRequest): Promise<CreateAppointmentServiceResponse>{
        const appointment = await this.appointmentsRepository.create({barberId,date,userId})
        return {
            appointment
        }
    }
}