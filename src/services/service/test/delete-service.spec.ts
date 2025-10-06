import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryServiceRepository } from "../../../repositories/in-memory/in-memory-service-repository";
import { ServicesRepository } from "../../../repositories/services-repository";
import { DeleteServiceUseCase } from "../delete-service";
import { ResourceNotFound } from "../../errors/ResourceNotFound";
let servicesRepository: ServicesRepository;
let deleteServiceUseCase: DeleteServiceUseCase;

describe("Create service use case", () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServiceRepository();
    deleteServiceUseCase = new DeleteServiceUseCase(servicesRepository);
  });

  it("should be able to delete a service", async () => {
    await servicesRepository.create({
      id: "Service-01",
      description: "Service description example",
      name: "Service",
      price: 35.0,
    });
    const { services } = await deleteServiceUseCase.execute({
      id: "Service-01",
    });

    expect(services).toHaveLength(0);
  });

  it("should not be able to delete a service that doesnt exists", async () => {
    expect(async () => {
      await deleteServiceUseCase.execute({
        id: "Service-01",
      });
    }).rejects.toBeInstanceOf(ResourceNotFound);
  });
});
