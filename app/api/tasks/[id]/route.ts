import { Tasks } from "@/models/tasks";
import mongoose from "mongoose";

export async function DELETE(request: Request, { params }: { params: { id: string }}) {

    mongoose.connect(process.env.MONGO_URL as string)

    const task = await Tasks.findByIdAndDelete(params.id);

    return Response.json(task);

}