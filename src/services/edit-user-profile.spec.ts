import {beforeEach, describe, expect, it} from 'vitest'
import { UsersRepository } from '../repositories/usersRepository'

import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExists } from './errors/UserAlreadyExists'
import { EditUserProfileService } from './edit-user-profile'
import { hash } from 'bcryptjs'

let userRepository: UsersRepository
let editUserProfileService: EditUserProfileService

describe("Register Service", () => {

    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        editUserProfileService = new EditUserProfileService(userRepository)
    })

    it("should be able to user edit his own profile", async () => {

        await userRepository.create({
            id: '1',
            name: "John Doe",
            email: "johndoe@example.com",
            phone: "123456789",
            password: await hash("123456", 10)
        })

        const {user} = await editUserProfileService.execute({
            id: "1",
            name: "Vitor Tester",
            email: "johndoe@example.com",
            phone: "31 982147060"
        })

        expect(user.name).toEqual("Vitor Tester")
        expect(user.phone).toEqual("31 982147060")
    })

  
})