'use client';

import { registerSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import apiService from "@/lib/utils";
import Link from "next/link";

const RegisterForm = ({}) => {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        console.log(values)
        const url = "/api/register/"
        const data = {
            email: values.email,
            password: values.password,
            username: values.username
        }

        apiService.registerUser(url, data)
    }
  
    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 min-w-[20rem] min-h-[25rem] max-w-[25rem] py-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="janedoe@example.com" {...field} />
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="janedoe123" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="123@/Abc" {...field} />
                  </FormControl>
                  <FormDescription>
                    Re-write your password here to confirm it
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Submit</Button>

            <div>
          <span>have an account? </span>
          <Link
            href="/auth/login"
            className="font-semibold"
          >
            sign in
          </Link>
          !
        </div>
          </form>
        </Form>
      )
}

export default RegisterForm