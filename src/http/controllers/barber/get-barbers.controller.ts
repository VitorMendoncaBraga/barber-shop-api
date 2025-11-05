import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateAppointmentService } from "../../../factories/create-appointment-factory";
import { BarberDoesntExists } from "../../../services/errors/BarberDoesntExists";
import { UserDoesntExists } from "../../../services/errors/UserDoesntExists";
import { InvalidDate } from "../../../services/errors/InvalidDate";
import { makeCreateBarberService } from "../../../factories/create-barber-factory";
import { BarberAlreadyExists } from "../../../services/errors/BarberAlreadyExists";
import { makeGetBarbersService } from "../../../factories/get-barbers-factory";

const getBarbersQuerySchema = z.object({
  page: z.coerce.number().default(1),
  query: z.string().optional()
});

export async function getBarbersController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { page, query } = getBarbersQuerySchema.parse(req.query);

  try {
    const getBarbersService = makeGetBarbersService()
    const { barbers } = await getBarbersService.execute({ page, query});

    return reply.status(200).send({ barbers });
  } catch (error) {

    throw error;
  }
}
