import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import mongoose from "mongoose";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { User } from "@/models/user";
import bcrypt from "bcrypt"

export const authConfig: AuthOptions = {
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

                mongoose.connect(process.env.MONGO_URL as string);
                const dbUser = await User.findOne({email: credentials.email})

                if (!dbUser || !dbUser?.hashedPassword) {
                    throw new Error("Invalid email or password");
                  }
    
                  const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    dbUser.hashedPassword
                  );
          
                  if (!isCorrectPassword) {
                    throw new Error("Invalid email or password");
                  }

                return dbUser;

            },
        }),


        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],

    pages: {
        signIn: "/",
    },
    debug: process.env.NODE_ENV === "development",

    session: {
        strategy: "jwt",
    },
    
}

export default NextAuth(authConfig);