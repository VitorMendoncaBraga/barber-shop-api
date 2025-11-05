import { FastifyReply, FastifyRequest } from "fastify";
import z from 'zod';
import { AuthenticateService } from "../../../services/user/authenticate";
import { makeAuthenticateService } from "../../../factories/authenticate-factory";
import { InvalidCredentials } from "../../../services/errors/InvalidCredentials";

const authenticateControllerBodySchema = z.object({
    email: z.email().nonempty(),
    password: z.string().nonempty()
})

export async function authenticateController(req: FastifyRequest, reply: FastifyReply){
    const { email, password } = authenticateControllerBodySchema.parse(req.body)

    try {
        
        const authenticateService = makeAuthenticateService()
        const {user} = await authenticateService.execute({email, password})

        const token = await reply.jwtSign( {} ,{
            sign: {
                sub: user.id
            }
        })

        reply.cookie('authToken', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/'
        })

        return reply.status(200).send({token})


    } catch (error) {
        if(error instanceof InvalidCredentials){
            return reply.status(400).send({error: error.message})
        }

        throw error 
    }
}