import { Prisma, Barber } from "../../generated/prisma";
import { prisma } from "../../prisma/prisma";
import { EditBarberServiceRequest } from "../../services/barber/edit-barber";
import { BarbersRepository } from "../barbers-repository";

export class PrismaBarberRepository implements BarbersRepository {
  async create(data: Prisma.BarberUncheckedCreateInput): Promise<Barber> {
    const barber = await prisma.barber.create({
      data,
    });

    return barber;
  }

  async delete(id: string) {
    return await prisma.barber.delete({
      where: {
        id,
      },
    });

    
  }

  async findByEmail(email: string): Promise<Barber | null> {
    const barber = await prisma.barber.findUnique({
      where: {
        email,
      },
    });

    return barber;
  }

  async edit({
    id,
    email,
    name,
    phone,
    status,
  }: EditBarberServiceRequest): Promise<Barber> {
    const barber = await prisma.barber.update({
      where: {
        id,
      },

      data: {
        email,
        name,
        phone,
        status,
      },
    });

    return barber;
  }

  async findById(id: string): Promise<Barber | null> {
    const barber = await prisma.barber.findUnique({
      where: {
        id,
      },
    });

    return barber;
  }

  async findMany(page: number, query: string | undefined): Promise<Barber[]> {
    if (query) {
      return await prisma.barber.findMany({
        where: {
          name: {
            contains: query,
            mode: "insensitive"
          },
        },

        skip: (page - 1) * 20,
        take: 20,
      });
    }

    return await prisma.barber.findMany({
      skip: (page - 1) * 20,
      take: 20,
    });
  }
}
