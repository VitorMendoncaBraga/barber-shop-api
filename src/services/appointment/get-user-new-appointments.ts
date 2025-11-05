import { Appointment } from "../../generated/prisma";
import { AppointmentRepository, FindNewAppointmentsByUserIdResponse } from "../../repositories/appointment-repository";
import { UsersRepository } from "../../repositories/users-repository";
import { ResourceNotFound } from "../errors/ResourceNotFound";
import { UserDoesntExists } from "../errors/UserDoesntExists";

interface GetUserNewAppointmentsServiceRequest {
    id: string,
}

interface GetUserNewAppointmentsServiceResponse {
   userAppointments: FindNewAppointmentsByUserIdResponse[]
}

export class GetUserNewAppointmentsService { 
    constructor(private appointmentRepository: AppointmentRepository, private userRepository: UsersRepository){}
    
    async execute({id}: GetUserNewAppointmentsServiceRequest): Promise<GetUserNewAppointmentsServiceResponse>{
        const user = await this.userRepository.findById(id)

        if(!user){
            throw new UserDoesntExists()
        }

        const userAppointments = await this.appointmentRepository.findNewAppointmentsByUserId(id)
        return {
            userAppointments
        }
    }
}