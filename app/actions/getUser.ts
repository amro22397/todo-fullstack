import { authConfig } from "@/lib/auth"
import { getServerSession } from "next-auth"

export default async (req: any, res: any) => {
    const session = await getServerSession(req, res, authConfig);
  }


  /*

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

  */