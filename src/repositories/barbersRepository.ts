import type { Prisma, Barber } from "../generated/prisma/index.js";
import { EditBarberServiceRequest } from "../services/edit-barber.js";


export interface BarbersRepository{
    create(data: Prisma.BarberUncheckedCreateInput): Promise<Barber>;
    findByEmail(email: string): Promise<Barber | null>;
    findById(id: string): Promise<Barber | null>
    edit({id,email,name,phone, status}: EditBarberServiceRequest): Promise<Barber>
    delete(id: string): Promise<Barber[]>
}