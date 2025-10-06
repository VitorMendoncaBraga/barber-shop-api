import { Product } from "../../generated/prisma";
import { ProductsRepository } from "../../repositories/products-repository";
import { ResourceNotFound } from "../errors/ResourceNotFound";

interface EditProductsServiceRequest { 
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number
}

interface EditProductsServiceResponse { 
    product: Product
}

export class EditProductsService {
    private productRepository: ProductsRepository

    constructor(productRepository: ProductsRepository) {
        this.productRepository = productRepository
    }

    async execute({id,description,name,price,stock}: EditProductsServiceRequest) : Promise <EditProductsServiceResponse> {

        const productExists = await this.productRepository.findById(id)

        if(!productExists){
            throw new ResourceNotFound()
        }

        const product = await this.productRepository.edit(id,name, description,price,stock)

        return {
            product
        }
    }
}