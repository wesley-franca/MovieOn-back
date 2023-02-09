import { ApplicationError } from "./error.type";

export function movieRatingConflictError(): ApplicationError {
    return {
        name: "movieRatingConflictError",
        message: "O email fornecido já possui um cadastro",
    };
}
