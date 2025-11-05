import { FastifyInstance } from "fastify";
import { createBarberController } from "../controllers/barber/create-barber.controller";
import { editBarberController } from "../controllers/barber/edit-barber.controller";
import { deleteBarberController } from "../controllers/barber/delete-barber.controller";
import { getBarbersController } from "../controllers/barber/get-barbers.controller";
import { getBarberController } from "../controllers/barber/get-barber.controller";
import { authenticateBarberController } from "../controllers/barber/authenticate.controller";
import { getBarberAppointmentsController } from "../controllers/appointment/get-barber-appointments.controller";
import { verifyJWT } from "../../middleware/verify-jwt";
import { logoutController } from "../controllers/user/logout.controller";
import { GetBarberAvailabilityController } from "../controllers/appointment/get-barber-availaibility.controller";

export function barberRoutes(app: FastifyInstance) {
  app.post("/create", { onRequest: [verifyJWT] }, createBarberController);
  app.post("/authenticate", authenticateBarberController);
  app.post("/logout", { onRequest: [verifyJWT] }, logoutController);
  app.get(
    "/appointments",
    { onRequest: [verifyJWT] },
    getBarberAppointmentsController
  );
  app.get(
    "/:id/availability",
    { onRequest: [verifyJWT] },
    GetBarberAvailabilityController
  );
  app.put("/:id", { onRequest: [verifyJWT] }, editBarberController);
  app.delete("/:id", { onRequest: [verifyJWT] }, deleteBarberController);
  app.get("/", { onRequest: [verifyJWT] }, getBarbersController);
  app.get("/:id", { onRequest: [verifyJWT] }, getBarberController);
}
