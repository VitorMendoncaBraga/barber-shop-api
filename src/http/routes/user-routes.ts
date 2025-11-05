import { FastifyInstance } from "fastify";
import { registerController } from "../controllers/user/register.controller";
import { authenticateController } from "../controllers/user/authenticate.controller";
import { getUserProfileController } from "../controllers/user/get-user-profile.controller";
import { verifyJWT } from "../../middleware/verify-jwt";
import { getUserAppointmentsController } from "../controllers/appointment/get-user-appointments.controller";
import { logoutController } from "../controllers/user/logout.controller";
import { editProfileController } from "../controllers/user/edit-profile.controller";
import { getUserConcluedAppointmentsController } from "../controllers/appointment/get-user-conclued-appointments";
import { getUserNewAppointmentsController } from "../controllers/appointment/get-user-new-appointments.controller";


export async function userRoutes(app: FastifyInstance) {
    app.post('/register', registerController)
    app.post('/authenticate',  authenticateController)
    app.get('/me', {onRequest: [verifyJWT]} ,  getUserProfileController)
    app.put('/me', {onRequest: [verifyJWT]},  editProfileController)
    app.get('/appointments', {onRequest: [verifyJWT]} ,  getUserAppointmentsController)
    app.get('/new-appointments', {onRequest: [verifyJWT]} ,  getUserNewAppointmentsController)
    app.get('/conclued-appointments', {onRequest: [verifyJWT]} ,  getUserConcluedAppointmentsController)
    app.post('/logout', {onRequest: [verifyJWT]} ,  logoutController)
    
}