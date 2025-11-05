import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetUserAppointmentsService } from "../../../factories/get-user-appointments-factory";
import { ResourceNotFound } from "../../../services/errors/ResourceNotFound";
import { makeGetUserNewAppointmentsService } from "../../../factories/get-user-new-appointments-factory";
import { UserDoesntExists } from "../../../services/errors/UserDoesntExists";

export async function getUserNewAppointmentsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getUserNewAppointmentsService = makeGetUserNewAppointmentsService();
    const { userAppointments } = await getUserNewAppointmentsService.execute({
      id: req.user.sub,
    });
    return reply.status(200).send({ userAppointments });
  } catch (error) {
    if (error instanceof UserDoesntExists) {
      return reply.status(400).send({ error: error.message });
    }
  }
}
