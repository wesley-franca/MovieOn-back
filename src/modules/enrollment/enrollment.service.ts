import { hasNoEnrollmentError } from "../../errors/hasNoEnrollmentError";
import { invalidBirthdayDateError } from "../../errors/invalidBirthdayDateError";
import { enrollmentRepository } from "../../repositories";
import { newEnrollmentBody } from "../../types/enrollment.types";

async function createEnrollment(body: newEnrollmentBody) {
    await checkValidBirthdayOrFail(body.birthday);
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

async function checkValidBirthdayOrFail(birthday: Date|string) {
    if((birthday.toString() === "Invalid Date" || typeof(birthday) === "string" )) throw invalidBirthdayDateError();

    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
        age--;
    }
    if (age < 10) throw invalidBirthdayDateError();
}

export const enrollmentService = {
    createEnrollment,
    getEnrollment,
};
