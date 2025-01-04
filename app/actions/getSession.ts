import { authConfig } from "@/lib/auth"
import { getServerSession } from "next-auth"

export const getSession = async () => {
    return await getServerSession(authConfig);
}