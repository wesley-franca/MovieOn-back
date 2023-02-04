import { ApplicationError } from "./error.type";

export function unauthorizedError(): ApplicationError {
    return {
        name: "unauthorizedError",
        message: "Não autorizado",
    };
}
