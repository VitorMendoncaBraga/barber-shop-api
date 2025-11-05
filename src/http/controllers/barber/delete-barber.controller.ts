import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { BarberDoesntExists } from "../../../services/errors/BarberDoesntExists";
import { makeDeleteBarberService } from "../../../factories/delete-barber-factory";

const deleteBarberParamsSchema = z.object({
  id: z.string().nonempty(),
});

export async function deleteBarberController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = deleteBarberParamsSchema.parse(req.params);

  try {
    const deleteBarberService = makeDeleteBarberService();
    await deleteBarberService.execute({id});

    return reply.status(200).send();
  } catch (error) {
    if (error instanceof BarberDoesntExists) {
      return reply.status(400).send({ error: error.message });
    }

    throw error;
  }
}
