import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ResourceNotFound } from "../../../services/errors/ResourceNotFound";
import { makeGetUserConcluedAppointmentsService } from "../../../factories/get-user-conclued-appointments-factory";

const getUserConcluedAppointmentsControllerParamsSchema = z.object({
    page: z.coerce.number().default(1)
})

export async function getUserConcluedAppointmentsController(
  req: FastifyRequest,
  reply: FastifyReply
) { 
    const {page} = getUserConcluedAppointmentsControllerParamsSchema.parse(req.params)

  try {
    const getUserConcluedAppointmentsService =
      makeGetUserConcluedAppointmentsService();
    const { userConcluedAppointments } =
      await getUserConcluedAppointmentsService.execute({
        id: req.user.sub,
        page

      });
    return reply.status(200).send({ userConcluedAppointments});
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message });
    }
  }
}
