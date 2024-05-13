"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormLabel,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Loader2 } from "lucide-react";

interface FormData {
  title: string;
  description: string;
  price: number;
  duration: number;
  instructorId: string;
  category: string[];
}

const CreateCoursePage = () => {
  const router = useRouter();
  const [showLoader, setShowLoader] = React.useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user || JSON.parse(user).role !== "instructor") {
      router.push("/sign-in");
    }
  });

  const handleSubmit = async (data: FormData) => {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    setShowLoader(true);

    try {
      const response = await axios.post(apiUrl + "course", {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        duration: Number(data.duration),
        instructorId: data.instructorId,
      });
      if (response.data.statusCode === 201) {
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
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    price: z
      .string()
      .min(1, { message: "Price is required" })
      .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
        message: "Price must be a number greater than 0",
      }),
    estimationPrice: z
      .string()
      .min(1, { message: "Estimation Price is required" })
      .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
        message: "Estimation Price must be a number greater than 0",
      }),
    duration: z
      .string()
      .min(1, { message: "Duration is required" })
      .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
        message: "Duration must be a number greater than 0",
      }),
    category: z.array(z.string()),
    isFree: z.boolean(),
    isPublished: z.boolean(),
  });

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      duration: 0,
    },
  });

  const { isSubmitting, isLoading } = form.formState;

  form.watch();

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 w-full">
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-6">Create Course</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Title"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Description"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="duration"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Duration"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectContent>
                        <SelectItem value="web">Web</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
                        <SelectItem value="desktop">Desktop</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-1.5">
              <Button type="submit">Create Course</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCoursePage;
