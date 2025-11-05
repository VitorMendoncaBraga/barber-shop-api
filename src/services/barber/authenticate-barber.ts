import { compare } from "bcryptjs";
import { Barber } from "../../generated/prisma";
import { BarbersRepository } from "../../repositories/barbers-repository";
import { InvalidCredentials } from "../errors/InvalidCredentials";

interface AuthenticateBarberServiceRequest {
    email: string,
    password: string
}

interface AuthenticateBarberServiceResponse {
    barber: Barber
}

export class AuthenticateBarberService {
    private barberRepository: BarbersRepository

    constructor(barberRepository: BarbersRepository) {
        this.barberRepository = barberRepository
    }

    async execute({email,password} : AuthenticateBarberServiceRequest): Promise<AuthenticateBarberServiceResponse>{
        const barber = await this.barberRepository.findByEmail(email)

        if(!barber){
            throw new InvalidCredentials()
        }

        const doesPasswordsMatchs = await compare(password, barber.password)

        if(!doesPasswordsMatchs){
            throw new InvalidCredentials()
        }

        return {
            barber
        }
    }
}