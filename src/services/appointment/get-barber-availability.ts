import {
  AppointmentRepository,
  FindManyBarberAppointmentsResponse,
} from "../../repositories/appointment-repository";
import { BarbersRepository } from "../../repositories/barbers-repository";
import { ResourceNotFound } from "../errors/ResourceNotFound";

interface GetBarberAvailabilityServiceRequest {
  date: Date;
  id: string;
}

interface GetBarberAvailabilityServiceResponse {
  barberId: string;
  date: Date;
  availableHoursStock: string[];
}

export class GetBarberAvailabilityService {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private barberRepository: BarbersRepository
  ) {}

  async execute({
    date,
    id,
  }: GetBarberAvailabilityServiceRequest): Promise<GetBarberAvailabilityServiceResponse> {
    const barber = await this.barberRepository.findById(id);
    if (!barber) throw new ResourceNotFound();

    const { barberCheckedAppointmentsDate } =
      await this.appointmentRepository.findBarberAvailabilityByDate(id, date);

    // 1) MAPEAR HORÁRIOS OCUPADOS COMO STRING "HH:MM"
    const busyHours = barberCheckedAppointmentsDate.date.map(
      (a) => a.toISOString().substring(11, 16) // "HH:MM"
    );

    // 2) GERAR SLOTS ENTRE 08:00 E 20:00
    const availableHoursStock: string[] = [];
    for (let h = 8; h < 20; h++) {
      const hourString = `${String(h).padStart(2, "0")}:00`;
      if (!busyHours.includes(hourString)) {
        availableHoursStock.push(hourString);
      }
    }

    return {
      barberId: id,
      date,
      availableHoursStock,
    };
  }
}
