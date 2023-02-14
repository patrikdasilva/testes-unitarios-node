import { Appointment } from "../entities/appointments";
import { AppointmentsRespository } from "../repositories/appointments-repository";

interface CreateAppointmentRequest {
    customer: string;
    startsAt: Date;
    endsAt: Date;
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment {

    constructor(
        private appointmentRepository: AppointmentsRespository
    ){}

    async execute({ customer, startsAt, endsAt }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
        const overlappingAppointment = await this.appointmentRepository.findOverlappingAppointment(startsAt, endsAt);

        if(overlappingAppointment) 
            throw new Error("Another appointment overlaps this appointments dates");
        
        const appointment = new Appointment({
            customer,
            startsAt,
            endsAt
        });

        await this.appointmentRepository.create(appointment);

        return appointment;
    }
}