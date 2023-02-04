import { hasNoEnrollmentError } from "../../errors/hasNoEnrollmentError";
import { enrollmentRepository } from "../../repositories";
import { newEnrollmentBody } from "../../types/enrollment.types";

async function createEnrollment(body: newEnrollmentBody) {
    await enrollmentRepository.upsert(body);
    return;
}

async function getEnrollment(userId: number) {
    const enrollment = await enrollmentRepository.getBuUserId(userId);
    if(!enrollment) throw hasNoEnrollmentError();
    delete enrollment.userId;
    delete enrollment.createdAt;
    delete enrollment.updatedAt;

    return enrollment;
}

export const enrollmentService = {
    createEnrollment,
    getEnrollment,
};
