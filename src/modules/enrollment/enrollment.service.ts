import { enrollmentRepository } from "../../repositories";
import { newEnrollmentBody } from "./enrollment.types";

async function createEnrollment(body: newEnrollmentBody) {    
    await enrollmentRepository.create(body);
    return;
}

export const enrollmentService = {
    createEnrollment,
};
