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
  id: string;
    date: Date;
    status: string;
    createdAt: Date;
    services: {
        service: {
            name: string;
            id: string;
            createdAt: Date;
            description: string;
            price: number;
        };
    }[];
    user: {
        name: string;
        id: string;
        email: string;
        phone: string;
    };
    barber: {
        name: string;
        id: string;
        createdAt: Date;
        email: string;
        phone: string;
    };
} 

export interface FindManyBarberAppointmentsResponse {
  id: string;
    date: Date;
    status: string;
    createdAt: Date;
    services: {
        service: {
            name: string;
            id: string;
            createdAt: Date;
            description: string;
            price: number;
        };
    }[];
    user: {
        name: string;
        id: string;
    };
}

export interface FindManyUserAppointmentsResponse {
  id: string;
    date: Date;
    status: string;
    createdAt: Date;
  barber: {
        name: string;
        id: string;
    };
    services: {
        service: {
            name: string;
            id: string;
            createdAt: Date;
            description: string;
            price: number;
        };
    }[];
}


export interface AppointmentRepository {
    create(data: CreateAppointmentData) : Promise<Appointment>
    findById(id: string) : Promise<FindAppointmentResponse | null>
    findManyByUserId(id: string, page: number) : Promise<FindManyUserAppointmentsResponse[]>
    findManyByBarberId(id: string,  page: number) : Promise<FindManyBarberAppointmentsResponse[]>
    cancel(id: string): Promise<Appointment>
}