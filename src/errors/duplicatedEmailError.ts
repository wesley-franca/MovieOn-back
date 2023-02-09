import { ApplicationError } from "./error.type";

export function duplicatedEmailError(): ApplicationError {
    return {
        name: "duplicatedEmailError",
        message: "O email fornecido já possui um cadastro",
    };
}
