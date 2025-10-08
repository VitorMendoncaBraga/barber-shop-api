import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryServiceRepository } from '../../../repositories/in-memory/in-memory-service-repository'
import { InMemoryAppointmentRepository } from '../../../repositories/in-memory/in-memory-appointment-repository'
import { CreateBarberService } from '../../barber/create-barber'
import { BarberAlreadyExists } from '../../errors/BarberAlreadyExists'
import { ServicesRepository } from '../../../repositories/services-repository'
import { CreateAppointmentService } from '../create-appointment'
import { AppointmentRepository } from '../../../repositories/appointment-repository'
import { BarbersRepository } from '../../../repositories/barbers-repository'
import { UsersRepository } from '../../../repositories/users-repository'
import { InMemoryBarberRepository } from '../../../repositories/in-memory/in-memory-barber-repository'
import { InMemoryUserRepository } from '../../../repositories/in-memory/in-memory-user-repository'
import { hash } from 'node:crypto'
import { UserDoesntExists } from '../../errors/UserDoesntExists'
import { BarberDoesntExists } from '../../errors/BarberDoesntExists'
import { InvalidDate } from '../../errors/InvalidDate'


let appointmentRepository: AppointmentRepository
let barberRepository: BarbersRepository
let userRepository: UsersRepository
let createAppointmentService: CreateAppointmentService

describe("Create service use case", () => {

    beforeEach(() => {
        appointmentRepository = new InMemoryAppointmentRepository()
        barberRepository = new InMemoryBarberRepository()
        userRepository = new InMemoryUserRepository()
        createAppointmentService = new CreateAppointmentService(appointmentRepository, barberRepository, userRepository)
    })

    it("should be able to create a appointment", async () => {

        await barberRepository.create({
            id: "barber-1",
            email: "barber@example.com",
            name: "Barber",
            password: "1212",
            createdAt: new Date(),
            status: 'available',
            phone: "191238"
        })

        await userRepository.create({
            email: "johndoe@example.com",
            name: "John Doe",
            password: "12121",
            phone: "1231232",
            id: "user-1",
            createdAt: new Date()

        })

        const { appointment } = await createAppointmentService.execute({
            barberId: "barber-1",
            // Put a valid date 
            date: new Date("October 17, 2025 03:24:00"),
            userId: "user-1"
        })

        expect(appointment.id).toEqual(expect.any(String))
    })

    it("should not be able to create a appointment for a unexistent user", async () => {

        await barberRepository.create({
            id: "barber-1",
            email: "barber@example.com",
            name: "Barber",
            password: "1212",
            createdAt: new Date(),
            status: 'available',
            phone: "191238"
        })

        expect(async () => {
            await createAppointmentService.execute({
                barberId: "barber-1",
                date: new Date("October 17, 2025 03:24:00"),
                userId: "user-1"
            })
        }).rejects.toBeInstanceOf(UserDoesntExists)



    })

    it("should not be able to create a appointment for a unexistent barber", async () => {

        await userRepository.create({
            email: "johndoe@example.com",
            name: "John Doe",
            password: "12121",
            phone: "1231232",
            id: "user-1",
            createdAt: new Date()

        })

        expect(async () => {
            await createAppointmentService.execute({
                barberId: "barber-1",
                date: new Date("October 17, 2025 03:24:00"),
                userId: "user-1"
            })
        }).rejects.toBeInstanceOf(BarberDoesntExists)



    })

    it("should not be able to create a appointment with a invalid date", async () => {

        await barberRepository.create({
            id: "barber-1",
            email: "barber@example.com",
            name: "Barber",
            password: "1212",
            createdAt: new Date(),
            status: 'available',
            phone: "191238"
        })

        await userRepository.create({
            email: "johndoe@example.com",
            name: "John Doe",
            password: "12121",
            phone: "1231232",
            id: "user-1",
            createdAt: new Date()

        })



        expect(async () => {
            await createAppointmentService.execute({
                barberId: "barber-1",
                date: new Date("October 6, 2025 21:12:00"),
                userId: "user-1"
            })
        }).rejects.toBeInstanceOf(InvalidDate)
    })


})