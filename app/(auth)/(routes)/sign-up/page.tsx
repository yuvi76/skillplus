"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const SignUpPage = () => {
  const router = useRouter();
  const [showLoader, setShowLoader] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: FormData) => {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    setShowLoader(true);

    try {
      const response = await axios.post(apiUrl + "auth/signup", {
        username: data.username.toLowerCase(),
        email: data.email.toLowerCase(),
        password: data.password,
      });
      if (response.data.statusCode === 201) {
        toast({ description: response.data.message });
        setShowLoader(false);
        router.push("/sign-in");
      }
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        description: error.response.data.message,
      });
      console.error(error.response.data.message);
      setShowLoader(false);
    }
  };

  const schema = z.object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(20, { message: "Username must be at most 20 characters" })
      .refine(
        (username) => {
          const usernameRegex = /^[a-zA-Z0-9_]*$/;

          return usernameRegex.test(username);
        },
        {
          message:
            "Username must contain only letters, numbers, and underscores",
        }
      ),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .refine(
        (password) => {
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

          return passwordRegex.test(password);
        },
        {
          message:
            "Password must contain at least one lowercase letter, one uppercase letter, one number, and one symbol",
        }
      ),
  });

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="grid w-full text-center gap-4">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter your username"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button disabled={showLoader} type="submit">
                  {showLoader ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <CardDescription>
            Already have an account?{" "}
            <a href="/sign-in" className="text-blue-500">
              Sign in
            </a>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
