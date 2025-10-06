import { Product } from "../../generated/prisma";
import { ProductsRepository } from "../../repositories/products-repository";

interface GetProductsServiceRequest { 
    page: number,
    query?: string
}

interface GetProductsServiceResponse { 
    products: Product[]
}

export class GetProductsService {
    private productRepository: ProductsRepository

    constructor(productRepository: ProductsRepository) {
        this.productRepository = productRepository
    }

    async execute({page,query}: GetProductsServiceRequest) : Promise<GetProductsServiceResponse> {
        const products = await this.productRepository.findMany(page, query)

        return {
            products
        }
    }
}