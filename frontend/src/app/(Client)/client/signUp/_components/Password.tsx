"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

type PasswordLoginProps = {
  page: number;
  setPage: (value: number) => void;
  email: string;
  setEmail: (value: string) => void;
  emailError: string;
  setEmailError: (value: string) => void;
  passwordUser: string;
  createUser: (password: string) => Promise<void>;
  setPasswordUser: (value: string) => void;
};
export function PasswordLogin({
  page,
  setPage,
  email,
  setEmail,
  emailError,
  setEmailError,
  passwordUser,
  createUser,
  setPasswordUser,
}: PasswordLoginProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const formSchema = z
    .object({
      password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
      }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Those password didn&apos;t match, Try again",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPasswordUser(values.password);
    createUser(values.password);
    console.log(setPasswordUser);
  }
  return (
    <div className="w-[450px] h-[180px] flex  mt-10 flex-col items-start gap-3 justify-center">
      <h1 className="text-3xl font-bold mt-45">Create strong password</h1>
      <p className="text-gray-500">
        Create a strong password with letters, numbers.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 "
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter your Password"
                    {...field}
                    type={showPassword ? "text" : "password"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Confirm you're password"
                    {...field}
                    type={showPassword ? "text" : "password"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-3 ">
            <Input
              className="w-[15px] h-[15px]"
              id="showPassword"
              checked={showPassword}
              onChange={togglePasswordVisibility}
              type="checkbox"
            />
            <Label htmlFor="showPassword">Show password</Label>
          </div>
          <div className="flex flex-col">
            <Button
              type="submit"
              className="bg-gray-400 w-[450px]  mb-5 text-white"
            >
              Let&apos;s go
            </Button>
            <div className="flex gap-2 pl-23">
              <p className="text-gray-500">Already have an account?</p>
              <Link href={"/SignUp"}>
                <span className="text-blue-500">Log in</span>
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
