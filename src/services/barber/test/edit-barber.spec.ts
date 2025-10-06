import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryBarberRepository } from '../../../repositories/in-memory/in-memory-barber-repository'
import { UserAlreadyExists } from '../../errors/UserAlreadyExists'
import { BarbersRepository } from '../../../repositories/barbers-repository'
import { BarberAlreadyExists } from '../../errors/BarberAlreadyExists'
import { EditBarberService } from '../edit-barber'
import { hash } from 'bcryptjs'

let barbersRepository: BarbersRepository
let editBarberService: EditBarberService

describe("Edit barber service", () => {

    beforeEach(() => {
        barbersRepository = new InMemoryBarberRepository()
        editBarberService = new EditBarberService(barbersRepository)
    })

    it("should be able to edit a barber", async () => {

        const createdBarber = await barbersRepository.create({
            id: "123",
            name: "John Doe",
            email: "johndoe@example.com",
            password: await hash("123456", 10),
            phone: "123125424",
        })

        const {barber} = await editBarberService.execute({
            id: "123",
            name: "John Doe",
            email: "johndoe@example.com",
            phone: "123125424",
            status: "unavailable"
        })

        expect(barber.email).toEqual("johndoe@example.com")
        expect(barber.status).toEqual("unavailable")
    })

    
})