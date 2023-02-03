import bcrypt from "bcrypt";
// import { authenticationRepository, userRepository } from "../../repositories";

// async function signIn({ email, password }: userBody) {
//     const user = await getUserByEmailOrFail(email);
//     const userId = user.id;
    
//     await validatePasswordOrFail(password, user);
    
//     const token = jwt.sign({ userId }, process.env.JWT_SECRET) as string;

//     const session = authenticationRepository.create(token, userId);
//     return session; 
// }

// async function getUserByEmailOrFail(email: string) {
//     const user = await userRepository.findByEmail(email);
//     if (!user) throw invalidEmailOrPasswordError();
//     return user;
// }

// async function validatePasswordOrFail(password: string, user: User) {
//     const authentication = await bcrypt.compareSync(password, user.password);

//     if(!authentication) throw invalidEmailOrPasswordError();
// }

export const enrollmentService = {
    // signIn,
};
