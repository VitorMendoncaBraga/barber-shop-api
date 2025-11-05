import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateAppointmentService } from "../../../factories/create-appointment-factory";
import { BarberDoesntExists } from "../../../services/errors/BarberDoesntExists";
import { UserDoesntExists } from "../../../services/errors/UserDoesntExists";
import { InvalidDate } from "../../../services/errors/InvalidDate";

const createAppointmentBodySchema = z.object({
  barberId: z.string().nonempty(),
  date: z.coerce.date(),
  services: z.array(
    z.object({
      service_id: z.string().nonempty(),
    })
  ),
});

export async function createAppointmentController(
  req: FastifyRequest,
  reply: FastifyReply
) {
    const {barberId,date,services} = createAppointmentBodySchema.parse(req.body)

    try {
        const userId = req.user.sub
        const createAppointmentService = makeCreateAppointmentService()
        const {appointment} = await createAppointmentService.execute({barberId,date,services,userId})
        return reply.status(201).send({appointment})

    } catch (error) {
        if(error instanceof BarberDoesntExists){
            return reply.status(400).send({error: error.message})
        }

        if(error instanceof UserDoesntExists){ 
            return reply.status(400).send({error: error.message})
        }

        if(error instanceof InvalidDate) {
            return reply.status(400).send({error: error.message})
        }

        throw error 
    }

}
