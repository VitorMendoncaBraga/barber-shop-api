import { PrismaProductsRepository } from "../repositories/prisma/products-repository";
import { CreateProductsService } from "../services/product/create-product";


export function makeCreateProductService() {
  const productRepository = new PrismaProductsRepository();
 
  const createProductService = new CreateProductsService(productRepository)

  return createProductService
}
