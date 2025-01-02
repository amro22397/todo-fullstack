import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import { ErrorHoverCard } from "./ErrorHoverCard";
import { useFormContext } from "react-hook-form";


const EmailInput = ({ name, label, onChange, value }: { name: string; label: string, onChange: any, value: string }) => {

 /* const { register, formState: { errors }} = useFormContext();

  const errorMessage = errors["email"] && errors["email"].message; */
  
  return (
    <div className="grid gap-2 relative">
      <Label htmlFor="email">{label}</Label>
      <Input
        // {...register(name)}
        id={name}
        name="email"
        type="email"
        value={value}
        onChange={onChange}
        placeholder="m@example.com"
        required
      />
      

      {/*
      {errors["email"] && (
        <>
          <ErrorHoverCard message={errorMessage?.toString()} />
        </>
      )}
      */}
    </div>
  )
}

export default EmailInput
