import { enrollmentRepository } from "../../repositories";
import { newEnrollmentBody } from "../../types/enrollment.types";

async function createEnrollment(body: newEnrollmentBody) {    
    //TODO: include verification "if there is already an enrollment"
    await enrollmentRepository.create(body);
    return;
}

export const enrollmentService = {
    createEnrollment,
};
