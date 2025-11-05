import { Prisma, Product } from "../../generated/prisma";
import { prisma } from "../../prisma/prisma";
import { ProductsRepository } from "../products-repository";

export class PrismaProductsRepository implements ProductsRepository {
  async create({
    id,
    description,
    name,
    price,
    stock,
    imgURL
  }: Prisma.ProductUncheckedCreateInput): Promise<Product> {
    const product = await prisma.product.create({
      data: {
        description,
        name,
        price,
        stock,
        imgURL
      },
    });

    return product;
  }

  async delete(id: string): Promise<Product> {
    const product = await prisma.product.delete({
      where: {
        id,
      },
    });

    return product;
  }

  async edit(
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    imgURL: string
  ): Promise<Product> {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        stock,
        imgURL,
      },
    });

    return product;
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    return product;
  }

  async findMany(page: number, query?: string): Promise<Product[]> {
    if (query) {
      const products = await prisma.product.findMany({
        where: {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },

        skip: (page - 1) * 20,
        take: 20,
      });

      return products;
    }

    const products = await prisma.product.findMany({
        skip: (page - 1) * 20,
        take: 20,
      });

      return products;

  }
}
