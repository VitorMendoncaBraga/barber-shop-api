import { describe, it, beforeEach, expect } from "vitest";
import { ProductsRepository } from "../../../repositories/products-repository";
import { EditProductsService } from "../edit-product";
import { InMemoryProductRepository } from "../../../repositories/in-memory/in-memory-product-repository";
import { ResourceNotFound } from "../../errors/ResourceNotFound";

let productRepository: ProductsRepository;
let editProductsService: EditProductsService;

describe("Edit product service", () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    editProductsService = new EditProductsService(productRepository);
  });

  it("should be able to edit a product", async () => {
    await productRepository.create({
      id: `1`,
      description: "Good product",
      name: `Barber Laser Cream`,
      price: 24.0,
      stock: 100,
    });

    const { product } = await editProductsService.execute({
      id: "1",
      description: "Good product",
      name: `Barber Cream`,
      price: 20.0,
      stock: 100,
    });
    expect(product.name).toEqual("Barber Cream");
    expect(product.price).toEqual(20.0);
  });

  it("should not be able to edit a product that doesnt exists", async () => {
    expect(async () => {
      await editProductsService.execute({
        id: "1",
        description: "Good product",
        name: `Barber Cream`,
        price: 20.0,
        stock: 100,
      });
    }).rejects.toBeInstanceOf(ResourceNotFound);
  });
});
