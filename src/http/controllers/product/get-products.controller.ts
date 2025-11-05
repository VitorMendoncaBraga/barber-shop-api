import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import {makeGetProductsService} from "../../../factories/get-products-factory"


const getProductsControllerQuerySchema = z.object({
    page: z.coerce.number().default(1),
    query: z.string().optional()
})



export async function getProductsController(req: FastifyRequest, reply: FastifyReply) {

    const {page,query} = getProductsControllerQuerySchema.parse(req.query)
   

    try{
        const getProductsUseCase = makeGetProductsService()

        const { products } = await getProductsUseCase.execute({page,query})

        return reply.status(200).send({products})
       
    }
    catch(error) {

        throw error
    }
}