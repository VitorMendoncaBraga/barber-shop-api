import {describe,expect,it,beforeEach} from 'vitest'
import { ServicesRepository } from '../../../repositories/services-repository'
import {InMemoryServiceRepository} from '../../../repositories/in-memory/in-memory-service-repository'
import { GetServiceUseCase } from '../get-service'
import { ResourceNotFound } from '../../errors/ResourceNotFound'

let servicesRepository : ServicesRepository
let getServiceUseCase: GetServiceUseCase

describe("Get service", () => {

    beforeEach(() => {
        servicesRepository = new InMemoryServiceRepository()
        getServiceUseCase = new GetServiceUseCase(servicesRepository)
    })

    it("should be able to get a service", async () => {
        
            servicesRepository.create({
                id: '1',
                description: `Good service - 1`,
                name: `Service 1`,
                price: 32,
            })
        

        const {service} = await getServiceUseCase.execute({id: '1'})
        expect(service.id).toEqual(expect.any(String))

    })

    it("should not be able to get a service that doesnt exists", async () => {
        
        expect(async () => {
            await getServiceUseCase.execute({id: '1'})
        }).rejects.toBeInstanceOf(ResourceNotFound)

    })
})