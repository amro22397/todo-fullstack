import CredentialsProvider from "next-auth/providers/credentials"
import mongoose from "mongoose";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { User } from "@/models/user";
import bcrypt from "bcrypt"

export const authConfig = {
    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                },
                password: {
                    label: "password",
                    type: "password",
                }
            },

            async authorize(credentials, req) {
                if (!credentials || !credentials.email || !credentials.password)
                    return null;

                mongoose.connect(process.env.MONGO_URL);
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
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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