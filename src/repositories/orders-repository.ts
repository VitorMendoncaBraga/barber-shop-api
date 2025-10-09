import { Order, Prisma } from "../generated/prisma";

export interface OrderRepository {
    create({userId, total}: Prisma.OrderUncheckedCreateInput): Promise<Order>
}