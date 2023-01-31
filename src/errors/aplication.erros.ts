export type ApplicationError = {
    name: string;
    message: string;
  };

function duplicatedEmailError(): ApplicationError {
    return {
        name: "duplicatedEmailError",
        message: "There is already an user with given email",
    };
}

export const applicationErrors = {
    duplicatedEmailError,
};
