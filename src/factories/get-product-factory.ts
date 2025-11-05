import { PrismaProductsRepository } from "../repositories/prisma/products-repository";
import {GetProductService } from "../services/product/get-product";


export function makeGetProductService() {
  const productRepository = new PrismaProductsRepository();
 
  const getProductService = new GetProductService(productRepository)

  return getProductService
}
