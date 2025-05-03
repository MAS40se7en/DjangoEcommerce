'use client';

import { loginSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import apiService from "@/lib/utils";
import Link from "next/link";

const LoginForm = ({ }) => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values)
    const url = "/api/login/"
    const data = {
      email: values.email,
      password: values.password
    }

    apiService.logUserIn(url, data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 min-w-[20rem] min-h-[25rem] max-w-[25rem] py-4">
        <h1><span className="font-semibold">Sign in</span> to your account!</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@example.com" {...field} />
              </FormControl>
              <FormDescription>
                This field is for your email!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="123@/Abc" {...field} />
              </FormControl>
              <FormDescription>
                This is your password
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Submit</Button>

        <div>
          <span>Don&apos;t have an account? </span>
          <Link
            href="/auth/register"
            className="font-semibold"
          >
            register
          </Link>
          !
        </div>
      </form>
    </Form>
  )
}

export default LoginForm