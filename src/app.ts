import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt'

export const app = fastify();

app.register(fastifyJwt, {
    secret: "onvioenviobviiwfjqwqfqwncopamqwmpxiqmwopf"
})
