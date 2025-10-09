import { Appointment } from "../../generated/prisma";
import { prisma } from "../../prisma/prisma";
import { AppointmentRepository, CreateAppointmentData, FindAppointmentResponse } from "../appointment-repository";

export class PrismaAppointmentRepository implements AppointmentRepository {
    async create({ barberId, date, userId, services }: CreateAppointmentData): Promise<Appointment> {
        const newAppointment = await prisma.appointment.create({
            data: {
                userId,
                barberId,
                date,

                services: {
                    createMany: {
                        data: services.map(service => ({
                            serviceId: service.service_id,
                        })),
                    }
                }

            }

        })

        return newAppointment
    }

    async cancel(id: string): Promise<Appointment> {
        const updatedAppointment = await prisma.appointment.update({
            where: {
                id,
            },
            data: {
                status: "cancelled"
            }
        })

        return updatedAppointment
    }

    async findById(id: string): Promise<FindAppointmentResponse | null> {
        const appointment = await prisma.appointment.findUnique({
            where: {
                id,
            },

            include: {
                barber: {
                    omit: {
                        createdAt: true,
                        email: true,
                        password: true,
                        phone: true,
                        role: true,
                        status: true
                    }
                },
                services: {
                    include: {
                        service: true
                    }
                }
            }
        })
    }

    async findManyByBarberId(id: string, page: number): Promise<Appointment[]> {

    }

    async findManyByUserId(id: string, page: number): Promise<Appointment[]> {

    }
}