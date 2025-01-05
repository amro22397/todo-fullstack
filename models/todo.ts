import { model, models, Schema } from "mongoose"

const TodoSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
        required: true,
    },
}, { timestamps: true });

export const Todo = models?.Todo || model("Todo", TodoSchema)