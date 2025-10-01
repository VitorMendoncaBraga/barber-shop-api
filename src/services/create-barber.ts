import { Barber } from "../generated/prisma";
import { BarbersRepository } from "../repositories/barbersRepository";
import { BarberAlreadyExists } from "./errors/BarberAlreadyExists";

interface CreateBarberServiceRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface CreateBarberServiceResponse {
  barber: Barber;
}

export class CreateBarberService {
  private barbersRepository: BarbersRepository;
  constructor(barbersRepository: BarbersRepository) {
    this.barbersRepository = barbersRepository;
  }
  async execute({
    name,
    email,
    password,
    phone,
  }: CreateBarberServiceRequest): Promise<CreateBarberServiceResponse> {
    const barberWithSameEmail = await this.barbersRepository.findByEmail(email);

    if (barberWithSameEmail) {
      throw new BarberAlreadyExists();
    }

    const barber = await this.barbersRepository.create({
      email,
      name,
      password,
      phone,
    });

    return {
      barber,
    };
  }
}
