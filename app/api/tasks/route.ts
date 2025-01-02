import { Tasks } from "@/models/tasks";
import mongoose from "mongoose";


export async function POST(request: Request) {

    mongoose.connect(process.env.MONGO_URL as string)

    const body = await request.json();

    const task = await Tasks.create(body);

    return Response.json(task);
}