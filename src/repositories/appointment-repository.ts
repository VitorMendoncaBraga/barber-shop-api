import type { Prisma, Appointment } from "../generated/prisma/index.js";


export interface AppointmentRepository {
    create(data: Prisma.AppointmentUncheckedCreateInput) : Promise<Appointment>
    findById(id: string) : Promise<Appointment | null>
    findManyByUserId(id: string, page: number) : Promise<Appointment[]>
    findManyByBarberId(id: string,  page: number) : Promise<Appointment[]>
    cancel(id: string): Promise<Appointment>
}