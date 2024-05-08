"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormData {
  password: string;
  passwordConfirmation: string;
}

const ResetPasswordPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const path = window.location.pathname;
  const parts = path.split("/");
  const token = parts[2];
  const [showLoader, setShowLoader] = React.useState(false);

  const handleSubmit = async (data: FormData) => {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    setShowLoader(true);

    try {
      const response = await axios.post(apiUrl + "auth/resetpassword", {
        newPassword: data.password,
        token: token,
      });
      if (response.data.statusCode === 200) {
        toast({ description: response.data.message });
        router.push("/sign-in");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.response.data.message,
      });
      console.error(error.response.data.message);
    } finally {
      setShowLoader(false);
    }
  };

  const schema = z
    .object({
      password: z
        .string()
        .min(8, {
          message: "New Password must be at least 8 characters",
        })
        .refine(
          (password) => {
            const lowercaseRegex = /[a-z]/;
            const uppercaseRegex = /[A-Z]/;
            const numberRegex = /[0-9]/;
            const symbolRegex = /[^A-Za-z0-9]/;

            return (
              lowercaseRegex.test(password) &&
              uppercaseRegex.test(password) &&
              numberRegex.test(password) &&
              symbolRegex.test(password)
            );
          },
          {
            message:
              "New Password must contain at least one lowercase letter, one uppercase letter, one number, and one symbol",
          }
        ),

      passwordConfirmation: z.string().min(8, {
        message: "Confirm Password must be at least 8 characters",
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    });

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  form.watch();

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="New Password"
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
                    name="passwordConfirmation"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm New Password"
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
                    "Reset Password"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p>
            <a href="/sign-in" className="text-blue-500 hover:underline">
              Back to Sign In
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
