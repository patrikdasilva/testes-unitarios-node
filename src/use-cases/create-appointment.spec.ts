import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointments";
import { getFeatureDate } from "../tests/utils/get-feature-date";
import { CreateAppointment } from "./create-appointment";
import { inMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appoinments-repository";

describe("Create Appointment", () => {
    it("should be able to create an appointment", () => {
        const appointmentRepository = new inMemoryAppointmentsRepository();
        const createAppointment = new CreateAppointment(appointmentRepository);

        const startsAt  = getFeatureDate("2022-08-10");
        const endsAt    = getFeatureDate("2022-08-11");

        expect(createAppointment.execute({
            customer: "John Doe",
            startsAt,
            endsAt
        })).resolves.toBeInstanceOf(Appointment)
    })

    it("should not be able to create an appointment with overlapping dates", async () => {
        const startsAt  = getFeatureDate("2022-08-10");
        const endsAt    = getFeatureDate("2022-08-15");

        const appointmentRepository = new inMemoryAppointmentsRepository();
        const createAppointment     = new CreateAppointment(appointmentRepository);

        await createAppointment.execute({
            customer: "John Doe",
            startsAt,
            endsAt
        })

        expect(createAppointment.execute({
            customer: "John Doe",
            startsAt: getFeatureDate("2022-08-14"),
            endsAt: getFeatureDate("2022-08-18")
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: "John Doe",
            startsAt: getFeatureDate("2022-08-14"),
            endsAt: getFeatureDate("2022-08-12")
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: "John Doe",
            startsAt: getFeatureDate("2022-08-14"),
            endsAt: getFeatureDate("2022-08-17")
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: "John Doe",
            startsAt: getFeatureDate("2022-08-11"),
            endsAt: getFeatureDate("2022-08-12")
        })).rejects.toBeInstanceOf(Error)
    })
})