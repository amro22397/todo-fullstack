import { authConfig } from "@/lib/auth"
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

      return session;

    } catch (error) {
      
      console.log(error);
      

    }
  }