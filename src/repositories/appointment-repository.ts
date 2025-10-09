import type { Prisma, Appointment, Service } from "../generated/prisma/index.js";

export interface CreateAppointmentData {
  id?: string;
  userId: string;
  barberId: string;
  date: Date | string;

   // Obrigando um array com os IDs dos serviços
   services: {
    service_id: string
   }[]
}

export interface FindAppointmentResponse {
  appointment: Appointment;
  
  
}

export interface AppointmentRepository {
    create(data: CreateAppointmentData) : Promise<Appointment>
    findById(id: string) : Promise<FindAppointmentResponse | null>
    findManyByUserId(id: string, page: number) : Promise<Appointment[]>
    findManyByBarberId(id: string,  page: number) : Promise<Appointment[]>
    cancel(id: string): Promise<Appointment>
}