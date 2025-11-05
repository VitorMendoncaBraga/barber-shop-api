import { Prisma, Product } from "../generated/prisma";

export interface ProductsRepository {
    findById(id: string): Promise<Product | null>
    create({id, description,name,price,stock, imgURL}: Prisma.ProductUncheckedCreateInput): Promise<Product>
    edit(id: string, name: string, description: string, price: number, stock: number, imgURL: string): Promise<Product>
    delete(id: string): Promise<Product>
    findMany( page: number, query?: string,): Promise<Product[]>
}