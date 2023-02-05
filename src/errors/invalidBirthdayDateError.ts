import { ApplicationError } from "./error.type";

export function invalidBirthdayDateError(): ApplicationError {
    return {
        name: "invalidBirthdayDateError",
        message: "Data de nascimento não é valida",
    };
}
