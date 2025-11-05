import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify/types/request";
import { makeGetUserProfile } from "../../../factories/get-user-profile";
import { ResourceNotFound } from "../../../services/errors/ResourceNotFound";

export async function getUserProfileController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getUserProfileService = makeGetUserProfile();

    const { user } = await getUserProfileService.execute({ id: req.user.sub });

    const userWithoutPassword = {
      ...user,
      password: undefined,
    };
    return reply.status(200).send({ user: userWithoutPassword });
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(404).send({ error: error.message });
    }

    throw error 
  }
}
