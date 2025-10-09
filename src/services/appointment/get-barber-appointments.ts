import { AppointmentRepository, FindManyBarberAppointmentsResponse } from "../../repositories/appointment-repository";
import { ResourceNotFound } from "../errors/ResourceNotFound";

interface GetBarberAppointmentsServiceRequest {
    id: string,
    page: number
}

interface GetBarberAppointmentsServiceResponse {
   barberAppointments: FindManyBarberAppointmentsResponse[]
}

export class GetBarberAppointmentsService { 
    constructor(private appointmentRepository: AppointmentRepository){}
    
    async execute({id,page}: GetBarberAppointmentsServiceRequest): Promise<GetBarberAppointmentsServiceResponse>{
        const barber = await this.appointmentRepository.findById(id)

        if(!barber){
            throw new ResourceNotFound()
        }

        const barberAppointments = await this.appointmentRepository.findManyByBarberId(id, page)
        return {
            barberAppointments
        }
    }
}