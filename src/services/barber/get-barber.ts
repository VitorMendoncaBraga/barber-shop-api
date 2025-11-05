import { Barber } from "../../generated/prisma";
import { BarbersRepository } from "../../repositories/barbers-repository";
import { BarberDoesntExists } from "../errors/BarberDoesntExists";

interface GetBarberRequest {
    id: string
}

interface GetBarberResponse {
    barber: Barber
}

export class GetBarberService {
    private barberRepository: BarbersRepository

    constructor(barberRepository: BarbersRepository) {
        this.barberRepository = barberRepository
    }

    async execute({id} : GetBarberRequest): Promise<GetBarberResponse>{
        const barber = await this.barberRepository.findById(id)

        if(!barber) { 
            throw new BarberDoesntExists()
        }

        return {
            barber
        }


    }
}