import {describe, it, expect, beforeEach} from 'vitest'
import { UsersRepository } from '../repositories/usersRepository'
import { AuthenticateService } from './authenticate'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'
import { randomUUID } from 'node:crypto'
import { hash } from 'bcryptjs'
import { InvalidCredentials } from './errors/InvalidCredentials'

let userRepository: UsersRepository
let authenticateService: AuthenticateService

describe("Authenticate service", () => {

    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        authenticateService = new AuthenticateService(userRepository)
    })

    it("should be able to authenticate",async () => {
        await userRepository.create({
            id: "user-01",
            email: "johndoe@example.com",
            name: "John Doe",
            password: await hash("123456", 10),
            phone: "123133452",
            createdAt: new Date()
        })

        const {user} = await authenticateService.execute({
            email: "johndoe@example.com",
            password: "123456"
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it("should not be able to authenticate with invalid email",async () => {
        await userRepository.create({
            id: "user-01",
            email: "johndoe@example.com",
            name: "John Doe",
            password: await hash("123456", 10),
            phone: "123133452",
            createdAt: new Date()
        })


        expect(async () => {
            await authenticateService.execute({
            email: "wrongemail@example.com",
            password: "123456"
        })
        }).rejects.toBeInstanceOf(InvalidCredentials)
    })

    it("should not be able to authenticate with wrong password",async () => {
        await userRepository.create({
            id: "user-01",
            email: "johndoe@example.com",
            name: "John Doe",
            password: await hash("123456", 10),
            phone: "123133452",
            createdAt: new Date()
        })


        expect(async () => {
            await authenticateService.execute({
            email: "johndoe@example.com",
            password: "wrong-password"
        })
        }).rejects.toBeInstanceOf(InvalidCredentials)
    })
})