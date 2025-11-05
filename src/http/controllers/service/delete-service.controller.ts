import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeleteServiceFactory } from "../../../factories/delete-service-factory";
import { ServiceAlreadyExists } from "../../../services/errors/ServiceAlreadyExists";
import { ResourceNotFound } from "../../../services/errors/ResourceNotFound";



const deleteServiceControllerParamsSchema = z.object({
    id: z.string().nonempty(),
})

export async function deleteServiceController(req: FastifyRequest, reply: FastifyReply) {

    const {id} = deleteServiceControllerParamsSchema.parse(req.params)

    try{
        const deleteServiceUseCase = makeDeleteServiceFactory()
        const { service } = await deleteServiceUseCase.execute({id})

        return reply.status(200).send({service,})
       
    }
    catch(error) {
        
        if(error instanceof ResourceNotFound){
            return reply.status(400).send({error: error.message})
        }

        throw error
    }
}