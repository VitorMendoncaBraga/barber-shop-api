import { describe, it, beforeEach, expect } from "vitest";
import { ProductsRepository } from "../../../repositories/products-repository";
import { DeleteProductsService } from "../delete-product";
import { InMemoryProductRepository } from "../../../repositories/in-memory/in-memory-product-repository";

let productRepository: ProductsRepository;
let deleteProductsService: DeleteProductsService;

describe("delete product service", () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    deleteProductsService = new DeleteProductsService(productRepository);
  });

  it("should be able to delete a product", async () => {
    for(let i = 1; i < 10; i++){
            await productRepository.create({
                id: `product-${i}`,
                description: "Good product",
                name: `Product ${i}`,
                price: 24.00,
                stock: 100
            })
        }

    const { products } = await deleteProductsService.execute({
      id: "product-1",
    });

    expect(products).toHaveLength(8)
   
  });
  
});
