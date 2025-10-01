import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod';

export const app = fastify();

app.register(fastifyJwt, {
    secret: "onvioenviobviiwfjqwqfqwncopamqwmpxiqmwopf"
})

app.setErrorHandler((error, request, reply) => {
    if(error instanceof ZodError){
        return reply.status(400).send({message: "Validate error", issues: error.format()})
    }

    return reply.status(500).send({message: "Internal server error"})
})
