import { randomUUID } from "node:crypto";
import { Prisma, Appointment } from "../../generated/prisma";
import { AppointmentRepository } from "../appointment-repository";

export class InMemoryAppointmentRepository implements AppointmentRepository {

    private items: Appointment[] = []

    async create({id, barberId,date,userId}: Prisma.AppointmentUncheckedCreateInput): Promise<Appointment> {
        const newAppointment : Appointment = {
            barberId,
            userId,
            date: new Date(date),
            createdAt: new Date(),
            id: id || randomUUID(),
            status: "confirmed"
        }   

        this.items.push(newAppointment)

        return newAppointment
    }

    async cancel(id: string): Promise<Appointment> {
        const appointmentIndex = this.items.findIndex((item) => item.id == id)
       
        this.items[appointmentIndex] = {
            ...this.items[appointmentIndex],
            status: "cancelled"
        }

        return this.items[appointmentIndex]
    }

    async findById(id: string): Promise<Appointment | null> {
        const appointment = this.items.find((item) => item.id == id)

        if(!appointment){
            return null
        }

        return appointment
    }

    async findManyByBarberId(id: string, page: number): Promise<Appointment[]> {
        const barberAppointments = await this.items.filter((item) => item.barberId == id).slice((page - 1) * 20, page * 20)
        return barberAppointments
    }

    async findManyByUserId(id: string, page: number): Promise<Appointment[]> {
        const userAppointments = await this.items.filter((item) => item.userId == id).slice((page - 1) * 20, page * 20)
        return userAppointments
    }
}