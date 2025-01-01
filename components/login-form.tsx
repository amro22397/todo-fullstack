"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { AppLogo } from "./AppLogo";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "./validationSchema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

import { useUserStore } from "@/app/stores/useUserStore";

// Infer the type from the schema
type AuthFormData = z.infer<typeof authSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const methods = useForm<AuthFormData>({ resolver: zodResolver(authSchema) });
  const { toast } = useToast();

  const router = useRouter();
  // const { loginFunction, isLoading } = useUserStore();

  const onSubmit = (data: AuthFormData) => {

    console.log("Sign In Data:", data);
    toast({ title: "Sign in successful", description: "You have signed in."})
  };

  const handleErrorToast = () => {
    const { errors } = methods.formState;


    if (errors.email) {
      toast({
        title: "Invalid Error",
        description: errors.email.message?.toString(),
        variant: "destructive",
      });
    }

    if (errors.password) {
      toast({
        title: "Validation Error",
        description: errors.password.message?.toString(),
        variant: "destructive",
      })
    }
  }
  return (
    <div>
      <AppLogo />
      <Card className="w-full max-w-sm py-2">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit, handleErrorToast)}>
            <CardHeader>
              <CardTitle className="text-[22px] font-bold">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 mt-3">
              <EmailInput name="email" label="Email" />
              <PasswordInput name="password" label="Password" />
              <div className="mt-4 text-sm flex items-center justify-center gap-1">
                <span>Don&apos;t have an account?</span>
                <Label className="text-primary">
                  <Link href="/sign-up">Sign up</Link>
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                sign in
              </Button>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>
  )
}
