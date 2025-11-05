import { AppointmentRepository, FindManyUserAppointmentsResponse } from "../../repositories/appointment-repository";
import { UsersRepository } from "../../repositories/users-repository";
import { ResourceNotFound } from "../errors/ResourceNotFound";

interface GetUserAppointmentsServiceRequest {
    id: string,
    page: number
}

interface GetUserAppointmentsServiceResponse {
   userAppointments: FindManyUserAppointmentsResponse[]
}

export class GetUserAppointmentsService { 
    constructor(private appointmentRepository: AppointmentRepository, private userRepository: UsersRepository){}
    
    async execute({id,page}: GetUserAppointmentsServiceRequest): Promise<GetUserAppointmentsServiceResponse>{
        const user = await this.userRepository.findById(id)

        if(!user){
            throw new ResourceNotFound()
        }

        const userAppointments = await this.appointmentRepository.findManyByUserId(id, page)
        return {
            userAppointments
        }
    }
}