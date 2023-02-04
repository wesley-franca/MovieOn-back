import { ApplicationError } from "./error.type";

export function hasNoEnrollmentError(): ApplicationError {
    return {
        name: "hasNoEnrollmentError",
        message: "Usuário ainda não completou o cadastro",
    };
}
