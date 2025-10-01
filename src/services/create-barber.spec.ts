import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryBarberRepository } from '../repositories/in-memory/in-memory-barber-repository'
import { UserAlreadyExists } from './errors/UserAlreadyExists'
import { BarbersRepository } from '../repositories/barbersRepository'
import { CreateBarberService } from './create-barber'
import { BarberAlreadyExists } from './errors/BarberAlreadyExists'

let barbersRepository: BarbersRepository
let createBarberService: CreateBarberService

describe("Create barber service", () => {

    beforeEach(() => {
        barbersRepository = new InMemoryBarberRepository()
        createBarberService = new CreateBarberService(barbersRepository)
    })

    it("should be able to create a barber", async () => {
        const {barber} = await createBarberService.execute({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456",
            phone: "123125424"
        })

        expect(barber.id).toEqual(expect.any(String))
        expect(barber.status).toEqual("available")
    })

    it("should not be able to create a barber with an existent email", async () => {
        await createBarberService.execute({
             name: "John Doe",
            email: "johndoe@example.com",
            password: "123456",
            phone: "123125424"
        })

        expect(async () => {
            await createBarberService.execute({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456",
            phone: "123456789"
        })
        }).rejects.toBeInstanceOf(BarberAlreadyExists)
    })
})