import { ApplicationError } from "./error.type";

export function invalidEmailOrPasswordError(): ApplicationError {
    return {
        name: "invalidEmailOrPasswordError",
        message: "Email e/ou senha incorretos",
    };
}
