import { FastifyInstance } from "fastify";
import { createAppointmentController} from "../controllers/appointment/create-appointment.controller";
import { verifyJWT } from "../../middleware/verify-jwt";
import { cancelAppointmentController } from "../controllers/appointment/cancel-appointment.controller";

export function appointmentRoutes(app: FastifyInstance){ 
    app.addHook("onRequest", verifyJWT)
    app.post('/create', {onRequest: [verifyJWT]} , createAppointmentController)
    app.patch('/cancel/:id', {onRequest: [verifyJWT]} , cancelAppointmentController)
   
}