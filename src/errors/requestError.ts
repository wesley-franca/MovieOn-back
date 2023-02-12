import { AxiosError } from "./error.type";

export function requestError(status, statusText): AxiosError  {
    return {
        name: "requestError",
        message: `error status: ${status}, error message: ${statusText}`,
        data: null
    };
}
