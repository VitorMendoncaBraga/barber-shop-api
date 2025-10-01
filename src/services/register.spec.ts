import {beforeEach, describe, expect, it} from 'vitest'
import { UsersRepository } from '../repositories/usersRepository'
import { RegisterService } from './register'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExists } from './errors/UserAlreadyExists'

let userRepository: UsersRepository
let registerService: RegisterService

describe("Register Service", () => {

    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        registerService = new RegisterService(userRepository)
    })

    it("should be able to register", async () => {
        const {user} = await registerService.execute({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456",
            phone: "123456789"
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it("should not be able to register with an existent email", async () => {
        await registerService.execute({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456",
            phone: "123456789"
        })

        expect(async () => {
            await registerService.execute({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456",
            phone: "123456789"
        })
        }).rejects.toBeInstanceOf(UserAlreadyExists)
    })
})