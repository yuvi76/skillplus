"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
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
import { Form, FormField } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

interface FormData {
  email: string;
  password: string;
}

const AuthPage = () => {
  const router = useRouter();
  const [showLoader, setShowLoader] = React.useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Example of using useRouter in an effect
    console.log(router.pathname);
  }, [router]);

  const handleSubmit = async (data: FormData) => {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    setShowLoader(true);

    try {
      const response = await axios.post(apiUrl + "auth/login", {
        email: data.email,
        password: data.password,
      });
      if (response.data.statusCode === 200) {
        toast({ description: response.data.message });
        setShowLoader(false);

        router.push("/dashboard");
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
    email: z.string().email(),
    password: z.string().min(6),
  });

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  form.watch();

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="grid w-full text-center gap-4">
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        placeholder="Enter your email"
                        required
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        required
                        {...field}
                      />
                    )}
                  />
                </div>
                <Button type="submit">
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
            Don&apos;t have an account?{" "}
            <a href="/sign-up" className="text-blue-500">
              Sign up
            </a>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;
