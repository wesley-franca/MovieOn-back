import { connectDb } from "../config/database";

const prisma = connectDb();

type enrollmentBody = {
  userId: number, 
  birthday, 
  instagram: string, 
  name: string, 
  lastName: string, 
  whatsapp: string 
}
function create( { 
    userId,
    birthday, 
    instagram, 
    name, 
    lastName, 
    whatsapp }: enrollmentBody) { 
    return prisma.enrollment.create({
        data: {
            userId,
            name,
            lastName,
            birthday,
            instagram,
            whatsapp,
        }
    });
}

export const enrollmentRepository = {
    create
};
