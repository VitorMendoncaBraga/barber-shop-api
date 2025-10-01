import { hash } from "bcryptjs";
import { Barber, Prisma } from "../generated/prisma";
import { BarbersRepository } from "../repositories/barbersRepository";
import { ResourceNotFound } from "./errors/ResourceNotFound";

export interface EditBarberServiceRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "available" | "unavailable";
}

interface EditBarberServiceResponse {
  barber: Barber;
}

export class EditBarberService {
  private barberRepository: BarbersRepository;

  constructor(barberRepository: BarbersRepository) {
    this.barberRepository = barberRepository;
  }

  async execute({
    id,
    email,
    name,
    phone,
    status,
  }: EditBarberServiceRequest): Promise<EditBarberServiceResponse> {
    
    const barber = await this.barberRepository.edit({
      id,
      email,
      name,
      phone,
      status,
    });
    return {
      barber,
    };
  }
}
