"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { GitBranch, Mail, OctagonAlertIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Passsword should be at least six digit",
  }),
});

type formData = z.infer<typeof formSchema>;

export default function SignInView() {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: formData) => {
    try {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onRequest: () => {
            setLoading(!loading);
          },
          onSuccess: ({ data }) => {
            setSuccess(!success);
            router.push("/");
          },
          onError: ({ error }) => {
            setError(true);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-700 to-violet-700 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
          {/* 🔹 Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 rounded-xl bg-white hover:bg-gray-100 transition"
            >
              <GitBranch className="h-5 w-5" />
              Continue with GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 rounded-xl bg-white hover:bg-gray-100 transition"
            >
              <Mail className="h-5 w-5 text-red-500" />
              Continue with Google
            </Button>
          </div>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                or sign in with email
              </span>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="yourname@example.com"
                        className="rounded-xl"
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        className="rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <Alert className="bg-destructive/20 border-2 border-red-500">
                  <OctagonAlertIcon className="!h-5 !w-5 !text-destructive" />
                  <AlertTitle className="text-md text-gray-900 font-semibold">
                    {error}
                  </AlertTitle>
                </Alert>
              )}

              <Button
                className="w-full rounded-xl  hover:bg-gray-700 transition"
                type="submit"
              >
                {loading ? "loading" : "Sign In"}
              </Button>
            </form>
          </Form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Forgot your password?
            <span className="text-indigo-600 hover:underline cursor-pointer ml-1">
              Reset
            </span>
          </p>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Don&#39;t have account{" "}
            <Link
              href="/sign-up"
              className="text-blue-600 hover:underline cursor-pointer ml-1"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
