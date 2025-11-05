import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeEditProductService} from "../../../factories/edit-product-factory"
import { ServiceAlreadyExists } from "../../../services/errors/ServiceAlreadyExists";

const editProductControllerBodySchema = z.object({
    description: z.string().nonoptional(),
    name: z.string().nonempty().nonoptional(),
    price: z.number().nonoptional(),
    stock: z.number().nonoptional(),
    imgURL: z.string().nonoptional()
})

const editProductControllerParamsSchema = z.object({
    id: z.string().nonempty().nonoptional()
})

export async function editProductController(req: FastifyRequest, reply: FastifyReply) {

    const {description,name,price, stock, imgURL} = editProductControllerBodySchema.parse(req.body)
    const {id} = editProductControllerParamsSchema.parse(req.params)

    try{
        const editProductUseCase = makeEditProductService()
        const { product } = await editProductUseCase.execute({description,name,price,stock, id, imgURL })

        return reply.status(200).send({product})
       
    }
    catch(error) {

        throw error
    }
}