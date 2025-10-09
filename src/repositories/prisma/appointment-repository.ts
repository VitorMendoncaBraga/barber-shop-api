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
                    create: services.map(service => ({
                        serviceId: service.service_id,
                    }))
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

            select: {
                id: true,
                date: true,
                status: true,
                createdAt: true,
                barber: {
                    omit: {
                        password: true,
                        role: true,
                        status: true
                    }
                }, 
                user: {
                    omit: {
                        password: true,
                        createdAt: true
                    }
                },
                services: {
                    select: {
                        service: true
                    }
                }
            }
            

            
        })

        return appointment
    }

    async findManyByBarberId(id: string, page: number) {
        const appointments = prisma.appointment.findMany({
            where: {
                barberId: id
            },

            select: {
                
                id: true,
                date: true,
                status: true,
                createdAt: true,

                user: {
                    omit: {
                        createdAt: true,
                        email: true,
                        password: true,
                        phone: true
                    }
                },

               services: {
                select: {
                    service: true
                },
               } 
            },

            orderBy: {
                date: "desc"
            },

            skip: (page - 1) * 20,
            take: 20


        })
        return appointments
    }

    async findManyByUserId(id: string, page: number) {
        const appointments = await prisma.appointment.findMany({
             where: {
                userId: id
             },

             select: {
                id: true,
                date: true,
                status: true,
                createdAt: true,

                services: {
                    select: {
                        service: true
                    }
                },
                
                barber: {
                    omit: {
                        createdAt: true,
                        email: true,
                        password: true,
                        phone: true,
                        role: true,
                        status: true

                    }
                }
             },

             orderBy: {
                date: "desc"
             },

             skip: (page - 1) * 20,
             take: 20 


        })

        return appointments
    }
}