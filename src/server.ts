import { app } from './app';
import { env } from './env';

async function startServer(){
    await app.listen({port: env.PORT})
    console.log("Server running 🚀")
}

startServer();