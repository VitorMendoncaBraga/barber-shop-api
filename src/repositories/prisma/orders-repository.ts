import { Prisma, Order } from "../../generated/prisma";
import { prisma } from "../../prisma/prisma";
import { CreateOrderData, OrderRepository } from "../orders-repository";



export class PrismaOrdersRepository implements OrderRepository {
  async create({ userId, total, products }: CreateOrderData): Promise<Order> {
    const order = await prisma.order.create({
      data: {
        userId,
        total,

        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.product_id,
              quantity: product.quantity,
            })),
          },
        },
      },
    });

    return order;
  }
}
