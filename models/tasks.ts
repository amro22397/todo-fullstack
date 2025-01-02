import { model, models, Schema } from "mongoose";


const TasksSchema = new Schema({
    name: {
        type: String,
    },
    priority: {
        type: String,
        default: "high"
    },
    status: {
        type: String,
        default: "in progress"
    },
    userEmail: {
        type: String,
    },
    userId: {
        type: String,
    },
}, { timestamps: true });


export const Tasks = models?.Tasks || model("Tasks", TasksSchema)