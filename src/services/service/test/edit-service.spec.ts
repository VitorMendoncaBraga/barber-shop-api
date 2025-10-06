import {beforeEach, describe, expect, it} from 'vitest'
import {InMemoryServiceRepository} from '../../../repositories/in-memory/in-memory-service-repository'
import { CreateBarberService } from '../../barber/create-barber'
import { BarberAlreadyExists } from '../../errors/BarberAlreadyExists'
import { ServicesRepository } from '../../../repositories/services-repository'
import { EditServiceUseCase } from '../edit-service'
import { ResourceNotFound } from '../../errors/ResourceNotFound'

let servicesRepository: ServicesRepository
let editServiceService: EditServiceUseCase

describe("Create service use case", () => {

    beforeEach(() => {
        servicesRepository = new InMemoryServiceRepository()
        editServiceService = new EditServiceUseCase(servicesRepository)
    })

    it("should be able to edit a service", async () => {
        await servicesRepository.create({
            id: "Service-01",
            description: "Service description example",
            name: "Service",
            price: 35.00,
          
        })
        const {service} = await editServiceService.execute({
            id: "Service-01",
            name: "Corte",
            description: "Corte de cabelo",
            price: 30.00
        })

        expect(service.name).toEqual("Corte")
    })

    it("should not be able to edit a service that doesnt exists", async () => {
        
        expect(async () =>{
             await editServiceService.execute({
            id: "Service-01",
            name: "Corte",
            description: "Corte de cabelo",
            price: 30.00
        })
        }).rejects.toBeInstanceOf(ResourceNotFound)
    })

})