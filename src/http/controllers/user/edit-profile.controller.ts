import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify/types/request";
import { makeGetUserProfile } from "../../../factories/get-user-profile";
import { ResourceNotFound } from "../../../services/errors/ResourceNotFound";
import { EditUserProfileService } from "../../../services/user/edit-user-profile";
import { makeEditProfile } from "../../../factories/edit-profile-factory";
import z from "zod";
import { UserAlreadyExists } from "../../../services/errors/UserAlreadyExists";

const editProfileControllerRequest = z.object({
  name: z.string().nonoptional(),
  email: z.email().nonoptional(),
  phone: z.string().nonoptional(),
})

export async function editProfileController(
  req: FastifyRequest,
  reply: FastifyReply
) {

  const {name, email, phone} = editProfileControllerRequest.parse(req.body)

  try {

    const editProfileService = makeEditProfile()
    console.log(req.user.sub)
    const { userWithoutPassword } = await editProfileService.execute({id: req.user.sub, name, email, phone });
    
    return reply.status(200).send({ userWithoutPassword });

  } catch (error) {

    if (error instanceof ResourceNotFound) {
      return reply.status(404).send({ error: error.message });
    }

    if(error instanceof UserAlreadyExists) {
        return reply.status(409).send({error: error.message})
    }

    throw error 
  }
}
