import { Appointment } from "../../generated/prisma";
import { AppointmentRepository, GetUserConcluedAppointmentsResponse } from "../../repositories/appointment-repository";
import { UsersRepository } from "../../repositories/users-repository";
import { ResourceNotFound } from "../errors/ResourceNotFound";

interface GetUserConcluedAppointmentsServiceRequest {
    id: string,
    page: number
}

interface GetUserConcluedAppointmentsServiceResponse {
    userConcluedAppointments: GetUserConcluedAppointmentsResponse[]
}



export class GetUserConcluedAppointmentsService { 
    constructor(private appointmentRepository: AppointmentRepository, private userRepository: UsersRepository){}
    
    async execute({id, page}: GetUserConcluedAppointmentsServiceRequest): Promise<GetUserConcluedAppointmentsServiceResponse>{
        const user = await this.userRepository.findById(id)

        if(!user){
            throw new ResourceNotFound()
        }

        const userConcluedAppointments = await this.appointmentRepository.findConcluedAppointmentsByUserId(id, page)
        return {
            userConcluedAppointments
        }
    }
}