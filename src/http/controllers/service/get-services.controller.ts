import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetServicesFactory } from "../../../factories/get-services-factory";
import { ServiceAlreadyExists } from "../../../services/errors/ServiceAlreadyExists";
import { ResourceNotFound } from "../../../services/errors/ResourceNotFound";

const getServicesControllerQuerySchema = z.object({
    page: z.coerce.number().default(1),
    query: z.string().optional()
})



export async function getServicesController(req: FastifyRequest, reply: FastifyReply) {

    const { page, query} = getServicesControllerQuerySchema.parse(req.query)

    try{
        const getServicesUseCase = makeGetServicesFactory()
        const { services } = await getServicesUseCase.execute({page,query})

        return reply.status(200).send({services})
       
    }
    catch(error) {
        
        if(error instanceof ResourceNotFound){
            return reply.status(400).send({error: error.message})
        }

        throw error
    }
}