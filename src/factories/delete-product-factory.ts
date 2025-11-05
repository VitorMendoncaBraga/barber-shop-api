import { PrismaProductsRepository } from "../repositories/prisma/products-repository";
import { DeleteProductsService } from "../services/product/delete-product";


export function makeDeleteProductService() {
  const productRepository = new PrismaProductsRepository();
 
  const deleteProductService = new DeleteProductsService(productRepository)

  return deleteProductService
}
