import { FastifyInstance } from "fastify";
import { createServiceController } from "../controllers/service/create-service.controller";
import { verifyJWT } from "../../middleware/verify-jwt";
import { getServiceController } from "../controllers/service/get-service.controller";
import { getServicesController } from "../controllers/service/get-services.controller";
import { editServiceController } from "../controllers/service/edit-service.controller";
import { deleteServiceController } from "../controllers/service/delete-service.controller";

export function serviceRoutes(app: FastifyInstance){ 
     app.addHook("onRequest", verifyJWT)
     
    app.post('/create', createServiceController)
    app.get('/:id', getServiceController)
    app.get('/', getServicesController)
    app.put('/:id', editServiceController)
    app.delete('/:id', deleteServiceController)
   
}