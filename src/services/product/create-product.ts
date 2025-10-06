import { Product } from "../../generated/prisma";
import { ProductsRepository } from "../../repositories/products-repository";

interface CreateProductsServiceRequest { 
    name: string,
    description: string,
    price: number,
    stock: number
}

interface CreateProductsServiceResponse { 
    product: Product
}

export class CreateProductsService {
    private productRepository: ProductsRepository

    constructor(productRepository: ProductsRepository) {
        this.productRepository = productRepository
    }

    async execute({description,name,price,stock}: CreateProductsServiceRequest) : Promise<CreateProductsServiceResponse> {
        const product = await this.productRepository.create({description,name,price,stock})

        return {
            product
        }
    }
}