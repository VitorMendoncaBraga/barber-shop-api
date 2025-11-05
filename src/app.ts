import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod';
import { userRoutes } from './http/routes/user-routes';
import cookies from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import { env } from './env';
import { barberRoutes } from './http/routes/barber-routes';
import { serviceRoutes } from './http/routes/service-routes';
import { appointmentRoutes } from './http/routes/appointment-routes';
import { productRoutes } from './http/routes/product-routes';

export const app = fastify();

app.register(cookies)

app.register(fastifyCors, {
    origin: true,
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
})

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'authToken',
        signed: false
    }
})

app.register(userRoutes, {
    prefix: '/user'
})
app.register(barberRoutes, {
    prefix: "/barber"
})
app.register(serviceRoutes, {
    prefix: "/service"
})
app.register(appointmentRoutes, {
    prefix: "/appointment"
})
app.register(productRoutes, {
    prefix: "/product"
})



app.setErrorHandler((error, request, reply) => {
    if(error instanceof ZodError){
        return reply.status(400).send({message: "Validate error", issues: error.format()})
    }


    if(env.NODE_ENV != "production"){
        console.error(error)
    }

    return reply.status(500).send({message: "Internal server error"})
})
