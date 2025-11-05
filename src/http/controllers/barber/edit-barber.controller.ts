import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateAppointmentService } from "../../../factories/create-appointment-factory";
import { BarberDoesntExists } from "../../../services/errors/BarberDoesntExists";
import { UserDoesntExists } from "../../../services/errors/UserDoesntExists";
import { InvalidDate } from "../../../services/errors/InvalidDate";
import { makeCreateBarberService } from "../../../factories/create-barber-factory";
import { BarberAlreadyExists } from "../../../services/errors/BarberAlreadyExists";
import { makeEditBarberService } from "../../../factories/edit-barber-factory";

const editBarberBodySchema = z.object({
  status: z.enum(["available", "unavailable"]),
  name: z.string().nonempty(),
  email: z.email().nonempty(),
  phone: z.string(),
});

const editBarberParamsSchema = z.object({
  id: z.string().nonempty()
});

export async function editBarberController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { email, name, phone,status } = editBarberBodySchema.parse(req.body);
  const {id} = editBarberParamsSchema.parse(req.params)

  try {
    const editBarberService = makeEditBarberService();
    const { barber } = await editBarberService.execute({ email, name, phone,id,status});

    return reply.status(200).send({ barber });
  } catch (error) {
    if (error instanceof BarberDoesntExists) {
      return reply.status(400).send({ error: error.message });
    }

    throw error;
  }
}
