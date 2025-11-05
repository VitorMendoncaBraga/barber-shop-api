import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetProductService } from "../../../factories/get-product-factory";
import { ResourceNotFound } from "../../../services/errors/ResourceNotFound";

const getProductControllerParamsSchema = z.object({
  id: z.string().nonempty(),
});

export async function getProductController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = getProductControllerParamsSchema.parse(req.params);

  try {
    const getProductUseCase = makeGetProductService();

    const { product } = await getProductUseCase.execute({ id });

    return reply.status(200).send({ product });
  } catch (error) {

    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({ error: error.message });
    }

    throw error;
  }
}
