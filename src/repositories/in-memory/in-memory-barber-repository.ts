import { randomUUID } from "crypto";
import { Prisma, Barber } from "../../generated/prisma";
import { BarbersRepository } from "../barbersRepository";
import { EditBarberServiceRequest } from "../../services/edit-barber";

export class InMemoryBarberRepository implements BarbersRepository {
  private items: Barber[] = [];
  async create({
    id,
    email,
    name,
    password,
    phone,
  }: Prisma.BarberUncheckedCreateInput){
    const barber: Barber = {
      id: id ?? randomUUID(),
      createdAt: new Date(),
      email,
      name,
      password,
      phone,
      role: 'barber',
      status: "available",
    };

    this.items.push(barber);
    return barber;
  }
  async findByEmail(email: string) {
    const barber = this.items.find((item) => item.email === email);
    if (!barber) {
      return null;
    }

    return barber;
  }

  async findById(id: string) {
      const barber = this.items.find((item) => item.id == id)
      if(!barber){
        return null
      }

      return barber
  }

  async edit({id, email, name, phone, status }: EditBarberServiceRequest){
    const barberIndex = this.items.findIndex((item) => item.id == id)

    this.items[barberIndex] = {
        ...this.items[barberIndex],
        email,
        name,
        phone,
        status
    }

    return this.items[barberIndex]

  }

  async delete(id: string) {
    return this.items.filter((item) => item.id != id)
  }

  async findMany(page: number, query: string | undefined): Promise<Barber[]> {
    if(query){
       return this.items.filter((barber) => barber.name.toLowerCase().includes(query.toLowerCase())).slice((page - 1) * 20, page * 20) 
    }  

    return this.items.slice((page - 1) * 20, page * 20)

  }
}
