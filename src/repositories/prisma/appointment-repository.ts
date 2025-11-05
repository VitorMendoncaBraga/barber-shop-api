import { Appointment } from "../../generated/prisma";
import { prisma } from "../../prisma/prisma";
import {
  AppointmentRepository,
  CreateAppointmentData,
  FindAppointmentResponse,
  FindBarberAvailabilityByDate,
} from "../appointment-repository";

export class PrismaAppointmentRepository implements AppointmentRepository {
  async create({
    barberId,
    date,
    userId,
    services,
  }: CreateAppointmentData): Promise<Appointment> {
    const newAppointment = await prisma.appointment.create({
      data: {
        userId,
        barberId,
        date,

        services: {
          createMany: {
            data: services.map((service) => ({
              serviceId: service.service_id,
            })),
          },
        },
      },
    });

    return newAppointment;
  }

  async cancel(id: string): Promise<Appointment> {
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        status: "cancelled",
      },
    });

    return updatedAppointment;
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
            status: true,
          },
        },
        user: {
          omit: {
            password: true,
            createdAt: true,
          },
        },
        services: {
          select: {
            service: true,
          },
        },
      },
    });

    return appointment;
  }

  async findManyByBarberId(id: string, page: number) {
    const appointments = await prisma.appointment.findMany({
      where: {
        barberId: id,
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
            phone: true,
          },
        },

        services: {
          select: {
            service: true,
          },
        },
      },

      orderBy: {
        date: "desc",
      },

      skip: (page - 1) * 20,
      take: 20,
    });
    return appointments;
  }

  async findManyByUserId(id: string, page: number) {
    const appointments = await prisma.appointment.findMany({
      where: {
        userId: id,
      },

      select: {
        id: true,
        date: true,
        status: true,
        createdAt: true,

        services: {
          select: {
            service: true,
          },
        },

        barber: {
          omit: {
            createdAt: true,
            email: true,
            password: true,
            phone: true,
            role: true,
            status: true,
          },
        },
      },

      orderBy: {
        date: "desc",
      },

      skip: (page - 1) * 20,
      take: 20,
    });

    return appointments;
  }

  async findNewAppointmentsByUserId(id: string) {
    const newAppointments = await prisma.appointment.findMany({
      where: {
        userId: id,
        date: {
          gt: new Date(),
        },
        status: "confirmed",
      },

      orderBy: {
        date: "asc",
      },

      select: {
        id: true,
        date: true,
        createdAt: true,
        status: true,

        barber: {
          select: {
            id: true,
            name: true
          }
        },

        services: {
          select: {
            service: true
          }
        },

        



      }
    });

    return newAppointments;
  }

  async findConcluedAppointmentsByUserId(id: string, page: number) {
    const concluedAppointments = await prisma.appointment.findMany({
      where: {
        userId: id,
        status: "concluded",
      },

      take: 20,
      skip: (page - 1) * 20,

      select: {
        id: true,
        createdAt: true,
        date: true,
        status: true,

        user: {
          select: {
            id: true,
            name: true
          }
        },

        barber: {
          select: {
            id: true,
            name: true
          }
        },

        services: {
          select: {
            service: {
              select: {
                id: true,
                name: true,
                price: true
              }
            }
          }
        }
        
        
        
      },

    });

    return concluedAppointments;
  }

  async findBarberAvailabilityByDate(
    id: string,
    date: Date
  ): Promise<FindBarberAvailabilityByDate> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const barberCheckedAppointmentsDate = await prisma.appointment.findMany({
      where: {
        barberId: id,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },

      select: {
        date: true,
      },
    });

    return {
      barberCheckedAppointmentsDate: {
        date: barberCheckedAppointmentsDate.map((a) => a.date),
      },
    };
  }
}
