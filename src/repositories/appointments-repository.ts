import { Appointment } from "../entities/appointments";

export interface AppointmentsRespository {
    create (appointment: Appointment): Promise<void>;
    findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null>
}