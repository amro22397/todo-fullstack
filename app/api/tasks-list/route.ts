import { TasksList } from "@/models/tasks-list";
import mongoose from "mongoose";

export async function POST(request: Request) {
    mongoose.connect(process.env.MONGO_URL as string)

    const body = await request.json();

    const taskList = await TasksList.create(body);

    return Response.json(taskList);
}