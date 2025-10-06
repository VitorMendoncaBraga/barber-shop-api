import { describe, it, beforeEach, expect } from "vitest";
import { ProductsRepository } from "../../../repositories/products-repository";
import { GetProductsService } from "../get-products";
import { InMemoryProductRepository } from "../../../repositories/in-memory/in-memory-product-repository";

let productRepository: ProductsRepository
let getProductsService: GetProductsService

describe("Get products service", () => {
    beforeEach(() => {
        productRepository = new InMemoryProductRepository
        getProductsService = new GetProductsService(productRepository)
    })

    it("should be able to get products paginated", async () => {
        for(let i = 1; i < 23; i++){
            await productRepository.create({
                id: `product-${i}`,
                description: "Good product",
                name: `Product ${i}`,
                price: 24.00,
                stock: 100
            })
        }

        const {products} = await getProductsService.execute({page: 1})
        expect(products).toHaveLength(20)
    })
    it("should be able to get products paginated and filtered", async () => {
        for(let i = 1; i < 10; i++){
            await productRepository.create({
                id: `product-${i}`,
                description: "Good product",
                name: `Product ${i}`,
                price: 24.00,
                stock: 100
            })
        }

        await productRepository.create({
                id: `12412`,
                description: "Good product",
                name: `Barber Laser Cream`,
                price: 24.00,
                stock: 100
            })

            await productRepository.create({
                id: `1345634`,
                description: "Good product",
                name: `Barber After Cream`,
                price: 32.00,
                stock: 100
            })

        const {products} = await getProductsService.execute({page: 1, query: "barber"})
        expect(products).toHaveLength(2)
    })
})