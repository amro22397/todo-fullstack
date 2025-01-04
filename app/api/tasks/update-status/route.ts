import { Tasks } from "@/models/tasks";
import mongoose from "mongoose";

export async function PUT(request: Request) {
    mongoose.connect(process.env.MONGO_URL as string)

    const { id, status } = await request.json();

    const task = await Tasks.findByIdAndUpdate(id, { status });

    return Response.json(task);
}