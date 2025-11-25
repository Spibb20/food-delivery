"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/context/user.provider";

export const Login = () => {
  const { login } = useAuth();
  const formSchema = z.object({
    email: z
      .string()
      .email("Invalid email. Use a format like example@email.com."),
    password: z
      .string()
      .min(6, { message: "Incorrect password. Please try again." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await login(values.email, values.password);
  }

  return (
    <>
      <div className="flex flex-col items-center  justify-center ">
        <div className="flex gap-16 ">
          <div className="flex flex-col relative">
            <Button className="rounded-[50%] bg-white absolute left-0 top-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M10 12L6 8L10 4"
                  stroke="#18181B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
              </svg>
            </Button>
            <h1 className="text-2xl font-bold mt-10">Log in </h1>
            <p className="text-gray-500 ">
              Log in to enjoy your favorite dishes.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5 "
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link href={"/client/forgotPass"}>
                  <p className="underline">Forgot password</p>
                </Link>
                <div className="flex flex-col">
                  <Button
                    type="submit"
                    className="bg-gray-400 w-[450px] mt-5 mb-5 text-white"
                  >
                    Let&apos;s go
                  </Button>
                  <div className="flex gap-2 pl-23">
                    <p className="text-gray-500">Don’t have an account?</p>
                    <Link href={"/sign-up"}>
                      <span className="text-blue-500">Sign up</span>
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
