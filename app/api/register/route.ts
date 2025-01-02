import mongoose from "mongoose"
import { User } from "@/models/user"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
    mongoose.connect(process.env.MONGO_URL as string)
    
    const {email, password} = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, hashedPassword })

    return Response.json(user);
}