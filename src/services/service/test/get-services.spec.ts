import {describe,expect,it,beforeEach} from 'vitest'
import { ServicesRepository } from '../../../repositories/services-repository'
import {InMemoryServiceRepository} from '../../../repositories/in-memory/in-memory-service-repository'
import { GetServicesUseCase } from '../get-services'

let servicesRepository : ServicesRepository
let getServicesUseCase: GetServicesUseCase

describe("Get services", () => {

    beforeEach(() => {
        servicesRepository = new InMemoryServiceRepository()
        getServicesUseCase = new GetServicesUseCase(servicesRepository)
    })

    it("should be able to get paginated services", async () => {
        for(let i = 1; i < 22; i++){
            servicesRepository.create({
                description: `Good service - ${i}`,
                name: `Service ${i}`,
                price: 32,
            })
        }

        const {services} = await getServicesUseCase.execute({page: 1})
        expect(services).toHaveLength(20)

    })
})