import { randomUUID } from "node:crypto";
import { Prisma, Product } from "../../generated/prisma";
import { ProductsRepository } from "../products-repository";

export class InMemoryProductRepository implements ProductsRepository {

    private items: Product[] = []

    async create({description,name,price, stock,id}: Prisma.ProductUncheckedCreateInput): Promise<Product> {
        const newProduct: Product = {
            id: id || randomUUID(),
            description,    
            createdAt: new Date(),
            name,
            price,
            stock,
        }

        this.items.push(newProduct)
        return newProduct
    }

    async delete(id: string) {
        const productIndex = this.items.findIndex((item) => item.id == id)
        const product = this.items[productIndex]
        this.items = this.items.filter((item) => item.id != id)
        return product
    }   

    async edit(id: string, name: string, description: string, price: number, stock: number): Promise<Product> {
        const productIndex = this.items.findIndex((item) => item.id == id)
        this.items[productIndex] = {
            ...this.items[productIndex],
            name,
            description,
            price,
            stock
        }

        return this.items[productIndex]
    }

    async findById(id: string): Promise<Product | null> {
        const product = this.items.find((item) => item.id == id)

        if(!product){
            return null
        }

        return product
    }

    async findMany(page: number, query?: string): Promise<Product[]> {
        if(query){
            return this.items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())).slice((page - 1) * 20, page * 20)
        }

        return this.items.slice((page - 1) * 20, page * 20)
    }
}