import { ApplicationError } from "./error.type";

export function invalidMovieIdError(): ApplicationError {
    return {
        name: "invalidMovieIdError",
        message: "O email fornecido já possui um cadastro",
    };
}
