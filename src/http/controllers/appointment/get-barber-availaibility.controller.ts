import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { GetBarberAvailabilityService } from "../../../services/appointment/get-barber-availability";
import { makeGetBarberAvailabilityService } from "../../../factories/get-barber-availability-factory";

export async function GetBarberAvailabilityController(
  req: FastifyRequest,
  reply: FastifyReply
) {

  // --- validação do request ---
  const paramsSchema = z.object({
    id: z.string(),
  });

  const querySchema = z.object({
    date: z.coerce.date(), // converte string -> Date
  });

  const { id } = paramsSchema.parse(req.params);
  const { date } = querySchema.parse(req.query);

  const getBarberAvailabilityService = makeGetBarberAvailabilityService()

  const availability = await getBarberAvailabilityService.execute({
    id,
    date,
  });

  return reply.status(200).send(availability);
}
