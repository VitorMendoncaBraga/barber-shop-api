import { describe, it, beforeEach, expect } from "vitest";
import { ProductsRepository } from "../../../repositories/products-repository";
import { CreateProductsService } from "../create-product";
import { InMemoryProductRepository } from "../../../repositories/in-memory/in-memory-product-repository";
import { ResourceNotFound } from "../../errors/ResourceNotFound";

let productRepository: ProductsRepository;
let createProductsService: CreateProductsService;

describe("create product service", () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    createProductsService = new CreateProductsService(productRepository);
  });

  it("should be able to create a product", async () => {
    
    const { product } = await createProductsService.execute({
      description: "Good product",
      name: `Barber Cream`,
      price: 20.0,
      stock: 100,
    });
    expect(product.name).toEqual("Barber Cream");
    expect(product.price).toEqual(20.0);
  });

});
