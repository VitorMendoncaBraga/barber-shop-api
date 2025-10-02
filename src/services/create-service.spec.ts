import {beforeEach, describe, expect, it} from 'vitest'
import {InMemoryServiceRepository} from '../repositories/in-memory/in-memory-service-repository'
import { CreateBarberService } from './create-barber'
import { BarberAlreadyExists } from './errors/BarberAlreadyExists'
import { ServicesRepository } from '../repositories/servicesRepository'
import { CreateServicesUseCase } from './create-services'

let servicesRepository: ServicesRepository
let createServiceService: CreateServicesUseCase

describe("Create service use case", () => {

    beforeEach(() => {
        servicesRepository = new InMemoryServiceRepository()
        createServiceService = new CreateServicesUseCase(servicesRepository)
    })

    it("should be able to create a service", async () => {
        const {service} = await createServiceService.execute({
            name: "Corte",
            description: "Corte de cabelo",
            price: 35.00
        })

        expect(service.id).toEqual(expect.any(String))
    })

})