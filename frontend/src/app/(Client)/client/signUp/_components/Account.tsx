"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

type AccountLoginProps = {
  email: string;
  setEmail: (value: string) => void;
  emailError: string;
  setEmailError: (value: string) => void;
  page: number;
  setPage: (value: number) => void;
  newEmail: string;
  setNewEmail: (value: string) => void;
};

export function AccountLogin({
  email,
  setEmail,
  emailError,
  setEmailError,
  page,
  setPage,
  newEmail,
  setNewEmail,
}: AccountLoginProps) {
  const formSchema = z.object({
    email: z.email("Invalid email. Use a format like example@email.com"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setEmail(values.email);
    setNewEmail(values.email);
    setPage(page + 1);
  }

  function nextPage() {}
  return (
    <div className="w-[450px] h-[170px] flex flex-col mt-18 items-start gap-5 justify-center">
      <h1 className="text-3xl font-bold mt-5">Create your account</h1>
      <p className="text-gray-500">Sign up to explore your favorite dishes.</p>

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
                    onChange={(e) => {
                      field.onChange(e);
                      setEmail(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col">
            <Button
              type="submit"
              disabled={page > 1}
              className="bg-gray-400 w-[450px] mb-10"
            >
              Let&apos;s go
            </Button>
          </div>
        </form>
      </Form>

      {emailError && <p className="text-red-500 ">{emailError}</p>}
    </div>
  );
}
