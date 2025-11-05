import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import z from 'zod'
import { makeRegisterFactory } from "../../../factories/register-factory";
import { UserAlreadyExists } from "../../../services/errors/UserAlreadyExists";

const registerControllerBodySchema = z.object({
    email: z.email().nonempty(),
    name: z.string().nonempty(),
    password: z.string().min(6).nonempty(),
    phone: z.string().nonempty()
})

export async function registerController(req: FastifyRequest, reply: FastifyReply) {
    const {email,name,password,phone} = registerControllerBodySchema.parse(req.body)

    try{
        const registerService = makeRegisterFactory()
        const {user} = await registerService.execute({email,name,password,phone})
        return reply.status(201).send({
            message: 'Registered succesfully', 
            user,
        })
    }

    catch(Error){
        if(Error instanceof UserAlreadyExists){
            return reply.status(409).send({
            error: Error.message 
           
        })
        }
    }
}