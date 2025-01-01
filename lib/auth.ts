import CredentialsProvider from "next-auth/providers/credentials"
import mongoose from "mongoose";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import { User } from "@/models/user";

export const authConfig: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },

            async authorize(credentials, req) {
                if (!credentials || !credentials.email || !credentials.password)
                    return null;

                mongoose.connect(process.env.MONGO_URL);
                const dbUser = await User.findOne({email: credentials.email});

                if (!dbUser) {
                    const user = await User.create({email: credentials.email, hashedPassword: credentials.password});
                    return Response.json(user);
                }


                if (dbUser && dbUser.password === credentials.password) {
                    const { password, createdAt, id, ...dbUserWithoutPassword } = dbUser;
                    return dbUserWithoutPassword as any;
                }

                return null;
            },
        }),


        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ]
}