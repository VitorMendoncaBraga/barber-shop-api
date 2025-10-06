import { Barber } from "../../generated/prisma";
import { BarbersRepository } from "../../repositories/barbers-repository";

interface GetBarbersServiceRequest{
    page: number,
    query?: string
}

interface GetBarbersServiceResponse{
    barbers: Barber[]
}

export class GetBarbersService{
    private barbersRepository: BarbersRepository
    constructor(barbersRepositoryL: BarbersRepository){
        this.barbersRepository = barbersRepositoryL
    }

    async execute({page, query}: GetBarbersServiceRequest ): Promise<GetBarbersServiceResponse>{
        const barbers = await this.barbersRepository.findMany(page, query)
        return {
            barbers
        }
    }

}