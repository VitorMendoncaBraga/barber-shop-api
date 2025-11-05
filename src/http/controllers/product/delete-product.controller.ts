import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeleteProductService } from "../../../factories/delete-product-factory"
import { ResourceNotFound } from "../../../services/errors/ResourceNotFound";



const deleteProductControllerParamsSchema = z.object({
    id: z.string().nonempty().nonoptional()
})

export async function deleteProductController(req: FastifyRequest, reply: FastifyReply) {

    const {id} = deleteProductControllerParamsSchema.parse(req.params)

    try{
        const deleteProductUseCase = makeDeleteProductService()
        await deleteProductUseCase.execute({id})

        return reply.status(200).send()
       
    }
    catch(error) {

        if(error instanceof ResourceNotFound){
            return reply.status(400).send({ error: error.message });
        }

        throw error
    }
}