import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
export function loadEnv() {
    var path = process.env.NODE_ENV === "test"
        ? ".env.test"
        : process.env.NODE_ENV === "dev"
            ? ".env.dev"
            : ".env";
    var currentEnvs = dotenv.config({ path: path });
    dotenvExpand.expand(currentEnvs);
}
