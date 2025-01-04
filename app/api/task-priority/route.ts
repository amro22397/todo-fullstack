import { Tasks } from "@/models/tasks";
import mongoose from "mongoose";

export async function PUT(request: Request) {
        mongoose.connect(process.env.MONGO_URL as string)
        const {id, priority} = await request.json();

        const task = await Tasks.findByIdAndUpdate(id, {priority: priority});

        return Response.json(task);

}