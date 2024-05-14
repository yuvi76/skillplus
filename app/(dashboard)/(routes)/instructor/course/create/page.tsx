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
import MultiSelectFormField from "@/components/ui/multi-select";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

interface FormData {
  title: string;
  description: string;
  price: number;
  estimationPrice: number;
  duration: number;
  category: string[];
  isFree: boolean;
  isPublished: boolean;
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
      const response = await axios.post(
        apiUrl + "courses",
        {
          title: data.title,
          description: data.description,
          price: Number(data.price),
          estimationPrice: Number(data.estimationPrice),
          duration: Number(data.duration),
          category: data.category,
          isFree: data.isFree,
          isPublished: data.isPublished,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.statusCode === 201) {
        toast({ description: response.data.message });
        setShowLoader(false);
        router.push("/instructor/course");
      } else {
        toast({ variant: "destructive", description: response.data.message });
        setShowLoader(false);
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
    estimationPrice: z.string().optional(),
    duration: z
      .string()
      .min(1, { message: "Duration is required" })
      .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
        message: "Duration must be a number greater than 0",
      }),
    category: z
      .array(z.string())
      .min(1)
      .nonempty("Please select at least one framework."),
    isFree: z.boolean().optional(),
    isPublished: z.boolean().optional(),
  });

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      estimationPrice: 0,
      duration: 0,
      category: [],
      isFree: false,
      isPublished: false,
    },
  });
  const authorsData = [
    {
      value: "author1",
      label: "Author 1",
    },
    {
      value: "author2",
      label: "Author 2",
    },
    {
      value: "author3",
      label: "Author 3",
    },
    {
      value: "author4",
      label: "Author 4",
    },
  ];
  const { isSubmitting } = form.formState;

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
              name="estimationPrice"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimation Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Estimation Price"
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
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frameworks</FormLabel>
                  <FormControl>
                    <MultiSelectFormField
                      options={authorsData}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select options"
                      variant="inverted"
                      animation={2}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="isFree"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is Free </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="isPublished"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is Published </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-1.5">
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Create Course"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCoursePage;
