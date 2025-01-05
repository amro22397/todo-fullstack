import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    hashedPassword: {
        type: String,
    },
}, {timestamps: true})

export const User = models?.User || model("User", UserSchema)