import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetUserAppointmentsService } from "../../../factories/get-user-appointments-factory";
import { ResourceNotFound } from "../../../services/errors/ResourceNotFound";


const getUserAppointmentsControllerBodySchema = z.object({
  page: z.coerce.number().default(1),
});

export async function getUserAppointmentsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  
  const { page } = getUserAppointmentsControllerBodySchema.parse(req.query);

  try {
    const getUserAppointmentsService = makeGetUserAppointmentsService();
    const { userAppointments } = await getUserAppointmentsService.execute({
      id: req.user.sub,
      page,
    });
    return reply.status(200).send({ userAppointments });
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message });
    }
  }
}
