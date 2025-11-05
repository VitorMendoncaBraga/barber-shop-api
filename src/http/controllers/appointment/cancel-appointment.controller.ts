import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { BarberDoesntExists } from "../../../services/errors/BarberDoesntExists";
import { UserDoesntExists } from "../../../services/errors/UserDoesntExists";
import { InvalidDate } from "../../../services/errors/InvalidDate";
import { makeCancelAppointmentService } from "../../../factories/cancel-appointment-factory";
import { ResourceNotFound } from "../../../services/errors/ResourceNotFound";

const cancelAppointmentParamsSchema = z.object({
  id: z.string().nonempty(),
});

export async function cancelAppointmentController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = cancelAppointmentParamsSchema.parse(req.params);

  try {
    const cancelAppointmentService = makeCancelAppointmentService();
    const appointment = await cancelAppointmentService.execute({ id });
    return reply.status(200).send({ appointment });
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message });
    }

    throw error;
  }
}
