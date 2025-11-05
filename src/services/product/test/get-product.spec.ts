import { describe, it, beforeEach, expect } from "vitest";
import { ProductsRepository } from "../../../repositories/products-repository";
import { GetProductService } from "../get-product";
import { InMemoryProductRepository } from "../../../repositories/in-memory/in-memory-product-repository";
import { ResourceNotFound } from "../../errors/ResourceNotFound";

let productRepository: ProductsRepository
let getProductService: GetProductService

describe("Get product service", () => {
    beforeEach(() => {
        productRepository = new InMemoryProductRepository
        getProductService = new GetProductService(productRepository)
    })

    it("should be able to get a product", async () => {
       
            await productRepository.create({
                id: `product-1`,
                description: "Good product",
                name: `Product 1`,
                price: 24.00,
                stock: 100
            })
        

        const {product} = await getProductService.execute({id: "product-1"})
        expect(product.id).toEqual(expect.any(String))
    })
    
     it("should not be able to get a product that doesnt exists", async () => {
       
        

        expect(async () => {
            await getProductService.execute({id: "product-1"})
        }).rejects.toBeInstanceOf(ResourceNotFound)
       
    })
})