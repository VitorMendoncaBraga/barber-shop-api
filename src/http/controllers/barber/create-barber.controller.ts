import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateAppointmentService } from "../../../factories/create-appointment-factory";
import { BarberDoesntExists } from "../../../services/errors/BarberDoesntExists";
import { UserDoesntExists } from "../../../services/errors/UserDoesntExists";
import { InvalidDate } from "../../../services/errors/InvalidDate";
import { makeCreateBarberService } from "../../../factories/create-barber-factory";
import { BarberAlreadyExists } from "../../../services/errors/BarberAlreadyExists";

const createBarberBodySchema = z.object({
  name: z.string().nonempty(),
  email: z.email().nonempty(),
  password: z.string().min(6),
  phone: z.string()
});

export async function createBarberController(
  req: FastifyRequest,
  reply: FastifyReply
) {
    const {email,name,password,phone} = createBarberBodySchema.parse(req.body)

    try {
       const createBarberService = makeCreateBarberService()
        const {barber} = await createBarberService.execute({email,name,password,phone})

        return reply.status(201).send({barber})

    } catch (error) {

        if(error instanceof BarberAlreadyExists){
            return reply.status(409).send({error: error.message})
        }

        throw error 

    }

}
