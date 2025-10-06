import { Product } from "../../generated/prisma";
import { ProductsRepository } from "../../repositories/products-repository";
import { ResourceNotFound } from "../errors/ResourceNotFound";

interface DeleteProductsServiceRequest {
  id: string;
}

interface DeleteProductsServiceResponse {
  products: Product[]
}

export class DeleteProductsService {
  private productRepository: ProductsRepository;

  constructor(productRepository: ProductsRepository) {
    this.productRepository = productRepository;
  }

  async execute({ id }: DeleteProductsServiceRequest): Promise<DeleteProductsServiceResponse> {
    const productExists = await this.productRepository.findById(id)
    if(!productExists){
        throw new ResourceNotFound()
    }
    const products = await this.productRepository.delete(id);
    return {
        products
    }
  }
}
