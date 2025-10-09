import { Appointment } from "../../generated/prisma";
import { AppointmentRepository } from "../../repositories/appointment-repository";
import { BarbersRepository } from "../../repositories/barbers-repository";
import { compareDate } from "../../utils/compareDate";
import { InvalidDate } from "../errors/InvalidDate";
import {UsersRepository} from "../../repositories/users-repository"
import { ResourceNotFound } from "../errors/ResourceNotFound";
import { UserDoesntExists } from "../errors/UserDoesntExists";
import { BarberDoesntExists } from "../errors/BarberDoesntExists";


interface CreateAppointmentServiceRequest{
    userId: string,
    barberId: string,
    date: Date,

    services: {
        service_id: string
    }[]
}

interface CreateAppointmentServiceResponse{
   appointment: Appointment
}

export class CreateAppointmentService {
    private appointmentsRepository: AppointmentRepository
    private barberRepository: BarbersRepository
    private userRepository: UsersRepository

    constructor(appointmentsRepository: AppointmentRepository, barberRepository: BarbersRepository,userRepository: UsersRepository){
        this.appointmentsRepository = appointmentsRepository;
        this.barberRepository = barberRepository
        this.userRepository = userRepository
    }

    async execute({barberId,date,userId, services} : CreateAppointmentServiceRequest): Promise<CreateAppointmentServiceResponse>{

        const barberExists = await this.barberRepository.findById(barberId)
        
        if(!barberExists) {
            throw new BarberDoesntExists()
        }

        const userExists = await this.userRepository.findById(userId)

        if(!userExists){
            throw new UserDoesntExists()
        }

        const isValidDate = compareDate(date)

        if(!isValidDate){
            throw new InvalidDate()
        }

        const appointment = await this.appointmentsRepository.create({barberId,date,userId, services})
        


        return {
            appointment
        }
    }
}