import { FastifyInstance } from "fastify";
import { createProductController } from "../controllers/product/create-product.controller";
import { editProductController } from "../controllers/product/edit-product.controller";
import { deleteProductController } from "../controllers/product/delete-product.controller";
import { getProductsController } from "../controllers/product/get-products.controller";
import { getProductController } from "../controllers/product/get-product.controller";
import { verifyJWT } from "../../middleware/verify-jwt";

export function productRoutes(app: FastifyInstance) {
     app.addHook("onRequest", verifyJWT)
    app.post("/", createProductController)
    app.put("/:id", editProductController)
    app.delete("/:id", deleteProductController)
    app.get("/", getProductsController)
    app.get("/:id", getProductController)
}