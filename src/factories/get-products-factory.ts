import { PrismaProductsRepository } from "../repositories/prisma/products-repository";
import { GetProductsService } from "../services/product/get-products";


export function makeGetProductsService() {
  const productRepository = new PrismaProductsRepository();
 
  const getProductsService = new GetProductsService(productRepository)

  return getProductsService
}
