import { FastifyReply, FastifyRequest } from "fastify";

export async function logoutController(req: FastifyRequest, reply: FastifyReply) {

    try {
        reply.clearCookie("authToken", {
        path: "/",
        httpOnly: true, // mesmo que no login
    })

    return reply.status(200).send({message: "Logout successfully"})
    }
    catch(error) {
        throw error
    }

}