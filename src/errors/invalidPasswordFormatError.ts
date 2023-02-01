import { ApplicationError } from "./error.type";

export function invalidPasswordFormatError(): ApplicationError {
    return {
        name: "invalidPasswordFormatError",
        message: "Senha muito fraca",
    };
}
