import { authConfig } from "@/lib/auth"
import { getServerSession } from "next-auth"

export async function getSession() {
    return await getServerSession(authConfig);
  }