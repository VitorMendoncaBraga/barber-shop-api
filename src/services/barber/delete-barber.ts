import { Barber } from "../../generated/prisma";
import { BarbersRepository } from "../../repositories/barbers-repository";
import { ResourceNotFound } from "../errors/ResourceNotFound";

interface DeleteBarberServiceRequest{
    id: string
}

interface DeleteBarberServiceResponse{
    barber: Barber
}

export class DeleteBarberService{
    private barberRepository: BarbersRepository

    constructor(barberRepository: BarbersRepository){ 
        this.barberRepository = barberRepository
    }

    async execute({id}: DeleteBarberServiceRequest): Promise<DeleteBarberServiceResponse>{
        const barber = await this.barberRepository.findById(id)
        if(!barber){
            throw new ResourceNotFound()
        }
        const barberList = await this.barberRepository.delete(id)
        return {
            barber
        }
    }
}