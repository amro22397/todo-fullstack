import { z } from 'zod'

export const authSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email"}),

    password: z.string().min(6, { message: "Password must be at least 6 characters long"}),
});


export const signUpSchema = authSchema.extend({
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
})