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

interface CourseDetails {
  id: string;
  title: string;
  description: string;
  price: number;
  estimatedPrice: number;
  duration: number;
  thumbnail: string;
  category: string[];
  numberOfStudents: number;
  ratings: number;
  tags: string[];
  language: string;
  isFree: boolean;
  isPublished: boolean;
}

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

const EditCoursePage = ({ params }: { params: { courseId: string } }) => {
  const router = useRouter();
  const [showLoader, setShowLoader] = React.useState(false);
  const { toast } = useToast();
  const [course, setCourse] = React.useState<CourseDetails | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user || JSON.parse(user).role !== "instructor") {
      router.push("/sign-in");
    }
  });

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const token = localStorage.getItem("token");

    axios
      .get(apiUrl + "courses/" + params.courseId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        response.data.data.numberOfStudents =
          response.data.data.students.length;
        response.data.data.price = response.data.data.price.toString();
        response.data.data.estimatedPrice =
          response.data.data.estimatedPrice.toString();
        response.data.data.duration = response.data.data.duration.toString();
        setCourse(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [params.courseId]);

  const onSubmit = async (data: FormData) => {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    setShowLoader(true);

    try {
      const response = await axios.put(
        apiUrl + "courses/" + params.courseId,
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
      if (response.data.statusCode === 200) {
        toast({ description: response.data.message });
        setShowLoader(false);
        router.push(`/instructor/course/${params.courseId}`);
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
    defaultValues: course
      ? {
          title: course.title,
          description: course.description,
          price: course.price,
          estimationPrice: course.estimatedPrice,
          duration: course.duration,
          category: course.category,
          isFree: course.isFree,
          isPublished: course.isPublished,
        }
      : {},
  });

  useEffect(() => {
    // Only update form values when course is loaded and form methods are available
    if (course) {
      form.reset({
        title: course.title,
        description: course.description,
        price: course.price,
        estimationPrice: course.estimatedPrice,
        duration: course.duration,
        category: course.category,
        isFree: course.isFree,
        isPublished: course.isPublished,
      });
    }
  }, [course, form, form.reset]);

  const { isSubmitting } = form.formState;

  form.watch();

  if (!course) return <div className="p-5">Loading...</div>;
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 w-full">
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
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
                      placeholder="Enter title"
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
                      placeholder="Enter description"
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
                      placeholder="Enter price"
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
                  <FormLabel>Estimated Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter estimated price"
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
                      placeholder="Enter duration"
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
                    <MultiSelectFormField
                      asChild
                      options={[
                        { label: "Web Development", value: "web-development" },
                        {
                          label: "Mobile Development",
                          value: "mobile-development",
                        },
                        { label: "Data Science", value: "data-science" },
                        {
                          label: "Artificial Intelligence",
                          value: "artificial-intelligence",
                        },
                        {
                          label: "Machine Learning",
                          value: "machine-learning",
                        },
                        { label: "Blockchain", value: "blockchain" },
                      ]}
                      defaultValue={course.category}
                      onValueChange={(value) => field.onChange(value)}
                      placeholder="Select category"
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
                  <FormLabel>Is Free</FormLabel>
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
                  <FormLabel>Is Published</FormLabel>
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Update Course"
              )}
            </Button>
            <Button className="ml-2"
              type="button"
              onClick={() =>
                router.push(`/instructor/course/${params.courseId}`)
              }
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditCoursePage;
