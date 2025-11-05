import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateServiceFactory } from "../../../factories/create-service-factory";
import { ServiceAlreadyExists } from "../../../services/errors/ServiceAlreadyExists";

const createServiceControllerBodySchema = z.object({
    description: z.string().nonempty(),
    name: z.string().nonempty(),
    price: z.number()
})

export async function createServiceController(req: FastifyRequest, reply: FastifyReply) {

    const {description,name,price} = createServiceControllerBodySchema.parse(req.body)

    try{
        const createServiceUseCase = makeCreateServiceFactory()
        const { service } = await createServiceUseCase.execute({description,name,price})

        return reply.status(201).send({service,})
       
    }
    catch(error) {
        if(error instanceof ServiceAlreadyExists){
            return reply.status(409).send({error: error.message})
        }

        throw error
    }
}