import { Order, Prisma } from "../generated/prisma";


export interface CreateOrderData {
  id?: string;
  userId: string;
  total: number;

  // Obrigando um array com os IDs dos serviços
  products: {
    product_id: string;
    quantity: number;
  }[];
}


export interface OrderRepository {
    create({userId, total, products}: CreateOrderData): Promise<Order>
}