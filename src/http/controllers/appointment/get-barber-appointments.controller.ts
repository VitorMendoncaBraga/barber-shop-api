import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetBarberAppointmentsService } from "../../../factories/get-barber-appointments-factory";
import { ResourceNotFound } from "../../../services/errors/ResourceNotFound";

const getBarberAppointmentsControllerQuerySchema = z.object({
  page: z.coerce.number().default(1),
});

export async function getBarberAppointmentsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  
  const { page } = getBarberAppointmentsControllerQuerySchema.parse(req.query);

  try {
    const getBarberAppointmentsService = makeGetBarberAppointmentsService();

    const { barberAppointments } = await getBarberAppointmentsService.execute({
      id: req.user.sub,
      page,
    });

    return reply.status(200).send({ barberAppointments });
    
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message });
    }
    throw error
  }
}
