import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeAuthenticateBarberService } from "../../../factories/authenticate-barber-factory";
import { BarberAlreadyExists } from "../../../services/errors/BarberAlreadyExists";
import { BarberDoesntExists } from "../../../services/errors/BarberDoesntExists";
import { InvalidCredentials } from "../../../services/errors/InvalidCredentials";

const authenticateBarberBodySchema = z.object({
  email: z.email().nonempty(),
  password: z.string(),
});

export async function authenticateBarberController(
  req: FastifyRequest,
  reply: FastifyReply
) {
    const {email,password} = authenticateBarberBodySchema.parse(req.body)

    try {
       const authenticateBarberService = makeAuthenticateBarberService()

        const { barber } = await authenticateBarberService.execute({email,password})

        const token = await reply.jwtSign({}, {
            sign: {
                sub: barber.id 
            }
        })

        reply.cookie("authToken", token ,{
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
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
