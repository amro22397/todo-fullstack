import { model, models, Schema } from "mongoose";


const TasksListSchema = new Schema({
    name: {
        type: String,
    },
    userEmail: {
        type: String,
    },
    userId: {
        type: String,
    },
}, { timestamps: true });


export const TasksList = models?.TasksList || model("TasksList", TasksListSchema)