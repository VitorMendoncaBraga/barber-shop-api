import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeEditServiceFactory } from "../../../factories/edit-service-factory";
import { ServiceAlreadyExists } from "../../../services/errors/ServiceAlreadyExists";
import { ResourceNotFound } from "../../../services/errors/ResourceNotFound";

const editServiceControllerBodySchema = z.object({
    description: z.string().nonempty(),
    name: z.string().nonempty(),
    price: z.number()
})

const editServiceControllerParamsSchema = z.object({
    id: z.string().nonempty(),
})

export async function editServiceController(req: FastifyRequest, reply: FastifyReply) {

    const {description,name,price} = editServiceControllerBodySchema.parse(req.body)
    const {id} = editServiceControllerParamsSchema.parse(req.params)

    try{
        const editServiceUseCase = makeEditServiceFactory()
        const { service } = await editServiceUseCase.execute({id,description,name,price})

        return reply.status(200).send({service,})
       
    }
    catch(error) {

        if(error instanceof ResourceNotFound){
            return reply.status(400).send({error: error.message})
        }

        if(error instanceof ServiceAlreadyExists) {
            return reply.status(409).send({error: error.message})
        }

        throw error
    }
}