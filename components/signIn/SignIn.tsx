"use client"

import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import { getServerSession } from "next-auth"
import { authConfig } from "@/lib/auth"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"

export default function LoginPage() {

  const session = useSession();
  const router = useRouter();


  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  )
}
