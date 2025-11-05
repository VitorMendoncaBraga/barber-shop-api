import { PrismaProductsRepository } from "../repositories/prisma/products-repository";
import { EditProductsService } from "../services/product/edit-product";


export function makeEditProductService() {
  const productRepository = new PrismaProductsRepository();
 
  const editProductService = new EditProductsService(productRepository)

  return editProductService
}
