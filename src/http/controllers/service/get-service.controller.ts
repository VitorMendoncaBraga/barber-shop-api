import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetServiceFactory } from "../../../factories/get-service-factory";
import { ServiceAlreadyExists } from "../../../services/errors/ServiceAlreadyExists";
import { ResourceNotFound } from "../../../services/errors/ResourceNotFound";

const getServicesControllerParamsSchema = z.object({
    id: z.string().nonoptional()
})



export async function getServiceController(req: FastifyRequest, reply: FastifyReply) {

    const {id} = getServicesControllerParamsSchema.parse(req.params)

    try{
        const getServicesUseCase = makeGetServiceFactory()

        const { service } = await getServicesUseCase.execute({id})

        return reply.status(200).send({ service })
       
    }
    catch(error) {
        
        if(error instanceof ResourceNotFound){
            return reply.status(400).send({error: error.message})
        }

        throw error
    }
}