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
import { AppLogo } from "../AppLogo";
import EmailInput from "../EmailInput";
import PasswordInput from "../PasswordInput";
import { signUpSchema } from "../ValidationSchema";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

import { signIn, useSession } from "next-auth/react";

import { useState } from "react";

import { auth, googleProvider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";

import axios from "axios";

// import { useUserStore } from "@/app/stores/useUserStore";


const SignUp = () => {

  const { toast } = useToast();
  const router = useRouter();


  /* const methods = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });
   const { signUpFunction, isLoading } = useUserStore();

   const onSubmit = async (data: SignUpFormData) => {
    const res = await signUpFunction({
      email: data.email,
      password: data.password,
    });

    if (res.result) {
      toast({
        title: "Sign up successful!",
        description: "Your account has been created.",
      });
      router.push("/to-dos");
    } else if (res.error) {
      toast({
        title: res.error,
        description:
          "This email is already registered. Please use a different email or try logging in.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sign up failed",
        description: "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const handleErrorsToast = () => {
    const { errors } = methods.formState;
    const errorFields = ["email", "password", "confirmPassword"] as const;

    errorFields.forEach((field) => {
      if (errors[field]) {
        toast({
          title: "Validation Error",
          description: errors[field]?.message?.toString(),
          variant: "destructive",
        });
      }
    });
  }; */


  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const session = useSession();
   console.log(session);
  
    const [formData, setFormData] = useState<any>({
      email: "",
      password: "",
    });
  
    const handleChange = (e: any) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    }
  
    console.log(formData)


    const handleSignUpWithGoogle = async (e:any) => {
    e.preventDefault();
    signIn('google', {callbackUrl: '/to-dos'})


    }


    const handleSubmit = async (e:any) => {
      e.preventDefault();

      setLoading(true);
      if (formData.password !== confirmPassword) {
        toast({
          variant: "destructive",
          title: "Passwords do not match",
        })
        setLoading(false);
        return;
      }



      axios.post("/api/register", formData).then(() => {
        toast({
          title: "Account created successfully",
        });

        signIn('credentials', {...formData, callbackUrl: '/to-dos'});
      }).then((callback: any) => {
        if (callback?.ok) {
          toast({
            title: "Logged in successfully"
          })
        }

        if (callback?.error) {
          toast({
            title: `There is an error: ${callback?.error}`,
          })
        }
      }).catch((error) => {
        toast({
          title: "Something went wrong",
        })
        console.log(error);
      }).finally(() => {
        setLoading(false);
      })
    }


  return (
    <div>
      <AppLogo />
      <Card className="w-full max-w-sm py-2">
        
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-[22px] font-bold">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 mt-3">
              
              <Button variant="outline" className="w-full" type="button"
                              onClick={handleSignUpWithGoogle}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                  <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="currentColor"
                                  />
                                </svg>
                                Continue with Google
                              </Button>

              <EmailInput name="email" label="Email" onChange={handleChange} value={formData.email} />
              <PasswordInput name="password" label="Password" onChange={handleChange} value={formData.password} />
              <PasswordInput name="confirmPassword" label="Confirm Password" onChange={(e: any) => setConfirmPassword(e.target.value)}
              value={confirmPassword} />
              
              <div className="mt-4 text-sm flex items-center justify-center gap-1">
                <span>Already have an account?</span>
                <Label className="text-primary">
                  <Link href="/">Sign in</Link>
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                {loading ? "Loading..." : "Create Account"}
              </Button>
            </CardFooter>
          </form>
        
      </Card>
    </div>
  )
}

export default SignUp