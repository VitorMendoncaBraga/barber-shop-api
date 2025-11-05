import { Product } from "../../generated/prisma";
import { ProductsRepository } from "../../repositories/products-repository";
import { ResourceNotFound } from "../errors/ResourceNotFound";

interface GetProductsServiceRequest { 
    id: string
}

interface GetProductsServiceResponse { 
    product: Product
}

export class GetProductService {
    private productRepository: ProductsRepository

    constructor(productRepository: ProductsRepository) {
        this.productRepository = productRepository
    }

    async execute({ id }: GetProductsServiceRequest) : Promise<GetProductsServiceResponse> {
        const product = await this.productRepository.findById(id)

        if(!product){
            throw new ResourceNotFound()
        }

        return {
            product
        }
    }
}