import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryBarberRepository } from '../../../repositories/in-memory/in-memory-barber-repository'
import { BarbersRepository } from '../../../repositories/barbers-repository'
import { DeleteBarberService } from '../delete-barber'
import { hash } from 'bcryptjs'

let barbersRepository: BarbersRepository
let deleteBarberService: DeleteBarberService

describe("Delete barber service", () => {

    beforeEach(() => {
        barbersRepository = new InMemoryBarberRepository()
        deleteBarberService = new DeleteBarberService(barbersRepository)
    })

    it("should be able to delete a barber", async () => {

        await barbersRepository.create({
            id: "123",
            name: "John Doe",
            email: "johndoe@example.com",
            password: await hash("123456", 10),
            phone: "123125424",
        })

        await barbersRepository.create({
            id: "1234",
            name: "John Doe 2",
            email: "johndoe2@example.com",
            password: await hash("123456", 10),
            phone: "1231254245",
        })

        const {barberList} = await deleteBarberService.execute({
            id: "1234",
        })

       expect(barberList).toHaveLength(1)
       
    })

    
})