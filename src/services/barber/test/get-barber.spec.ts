import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryBarberRepository } from "../../../repositories/in-memory/in-memory-barber-repository";
import { BarbersRepository } from "../../../repositories/barbers-repository";
import { GetBarberService } from "../get-barber";
import { hash } from "bcryptjs";
import { BarberDoesntExists } from "../../errors/BarberDoesntExists";

let barbersRepository: BarbersRepository;
let getBarberService: GetBarberService;

describe("Get barbers service", () => {
  beforeEach(() => {
    barbersRepository = new InMemoryBarberRepository();
    getBarberService = new GetBarberService(barbersRepository);
  });

  it("should be able to get barber", async () => {
    await barbersRepository.create({
      id: `1`,
      name: `John Doe`,
      email: `johndoe@example.com`,
      password: await hash("123456", 10),
      phone: "123",
    });

    const { barber } = await getBarberService.execute({ id: "1" });

    expect(barber.id).toEqual(expect.any(String));
  });

  it("should not be able to get a unexistent barber", async () => {
    expect(async () => {
      const { barber } = await getBarberService.execute({ id: "1" });
    }).rejects.toBeInstanceOf(BarberDoesntExists);
  });
});
