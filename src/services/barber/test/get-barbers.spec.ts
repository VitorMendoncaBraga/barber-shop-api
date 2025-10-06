import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryBarberRepository } from '../../../repositories/in-memory/in-memory-barber-repository'
import { BarbersRepository } from '../../../repositories/barbers-repository'
import { GetBarbersService } from '../get-barbers'
import { hash } from 'bcryptjs'

let barbersRepository: BarbersRepository
let getBarbersService: GetBarbersService

describe("Get barbers service", () => {

    beforeEach(() => {
        barbersRepository = new InMemoryBarberRepository()
        getBarbersService = new GetBarbersService(barbersRepository)
    })

    it("should be able to get paginated barbers (page 1)", async () => {

        for(let i = 0; i < 22; i++){
            await barbersRepository.create({
            id: `${i}`,
            name: `John Doe-${i}`,
            email: `johndoe${i}@example.com`,
            password: await hash("123456", 10),
            phone: "123",
        })
        }

        const {barbers} = await getBarbersService.execute({page: 1})

        

        

       expect(barbers).toHaveLength(20)
       
    })

    it("should be able to get paginated barbers (page 2)", async () => {

        for(let i = 0; i < 35; i++){
            await barbersRepository.create({
            id: `${i}`,
            name: `John Doe-${i}`,
            email: `johndoe${i}@example.com`,
            password: await hash("123456", 10),
            phone: "123",
        })
        }

        const {barbers} = await getBarbersService.execute({page: 2})

        

        

       expect(barbers).toHaveLength(15)
       
    })

    it("should be able to get filtered and paginated barbers", async () => {

        await barbersRepository.create({
            id: "1",
            name: `Test`,
            email: `test@example.com`,
            password: await hash("123456", 10),
            phone: "123",
        })

        await barbersRepository.create({
            id: "2",
            name: `Test2`,
            email: `test2@example.com`,
            password: await hash("123456", 10),
            phone: "123",
        })

         for(let i = 0; i < 15; i++){
            await barbersRepository.create({
            id: `${i}`,
            name: `John Doe-${i}`,
            email: `johndoe${i}@example.com`,
            password: await hash("123456", 10),
            phone: "123",
        })
        } 

        const {barbers} = await getBarbersService.execute({page: 1, query: "Test"})

        expect(barbers).toHaveLength(2)


    })

    
})