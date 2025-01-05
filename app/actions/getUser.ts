import { authConfig } from "@/lib/auth"
import { User } from "@/models/user";
import mongoose from "mongoose";
import { getServerSession } from "next-auth"

export async function getSession() {
  return await getServerSession(authConfig);
}


  
  export async function getUser() {
    try {
      const session = await getSession();

      if (!session?.user?.email) {
        return null;
      }

      const currentUser = await User.findOne({email: session?.user?.email})

    if (!currentUser) {
        mongoose.connect(process.env.MONGO_URL as string)
        const user = await User.create({ email: session?.user?.email  })
        return {
          ...user,
              createdAt: currentUser.createdAt.toString(),
              updateAt: currentUser.updatedAt.toString(),
        };

    } else {
      return {
        ...currentUser,
            createdAt: currentUser.createdAt.toString(),
            updateAt: currentUser.updatedAt.toString(),
      };
    }

    } catch (error: any) {
      
      console.log(error);
      

    }
  }

  