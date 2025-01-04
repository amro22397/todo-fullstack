import { Tasks } from "@/models/tasks";
import mongoose from "mongoose";


export async function POST(request: Request) {

    mongoose.connect(process.env.MONGO_URL as string)

    const body = await request.json();

    const task = await Tasks.create(body);

    return Response.json(task);
}


export async function PUT(request: Request) {
    mongoose.connect(process.env.MONGO_URL as string)
    
    const body = await request.json();
    const { id, ...rest } = body

    const task = await Tasks.findByIdAndUpdate(id, rest);

    return Response.json(task);
}

export async function DELETE() {
    mongoose.connect(process.env.MONGO_URL as string)

    const tasks = await Tasks.deleteMany({})

    return Response.json(tasks)
}