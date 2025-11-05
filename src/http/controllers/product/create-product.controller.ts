import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateProductService } from "../../../factories/create-product-factory"
import { ServiceAlreadyExists } from "../../../services/errors/ServiceAlreadyExists";

const createProductControllerBodySchema = z.object({
    description: z.string().nonoptional(),
    name: z.string().nonempty().nonoptional(),
    price: z.number().nonoptional(),
    stock: z.number().nonoptional(),
    imgURL: z.string().nonoptional()
})

export async function createProductController(req: FastifyRequest, reply: FastifyReply) {

    const {description,name,price, stock, imgURL} = createProductControllerBodySchema.parse(req.body)

    try{
        const createProductUseCase = makeCreateProductService()
        const { product } = await createProductUseCase.execute({description,name,price,stock, imgURL})

        return reply.status(201).send({product})
       
    }
    catch(error) {
     
        throw error
    }
}