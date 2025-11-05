import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetBarberService } from "../../../factories/get-barber-factory";
import { BarberDoesntExists } from "../../../services/errors/BarberDoesntExists";

const getBarbersParamsSchema = z.object({
  id: z.string().nonempty(),
});

export async function getBarberController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = getBarbersParamsSchema.parse(req.params);

  try {
    const getBarberService = makeGetBarberService();
    const { barber } = await getBarberService.execute({ id });

    return reply.status(200).send({ barber });
  } catch (error) {
    if (error instanceof BarberDoesntExists) {
      return reply.status(400).send({ error: error.message });
    }

    throw error;
  }
}
