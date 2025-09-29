import { app } from './app';

async function startServer(){
    await app.listen({port: 3333})
    console.log("Server running 🚀")
}

startServer();