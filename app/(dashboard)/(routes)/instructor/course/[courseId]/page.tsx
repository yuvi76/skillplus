"use client";
import router from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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

const CourseIdPage = ({ params }: { params: { courseId: string } }) => {
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
        setCourse(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [params.courseId]);

  if (loading) return <div className="p-5">Loading...</div>;
  if (!course) return <div className="p-5 text-red-500">No course found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">
          <strong>{course.title}</strong>
        </h1>
        <p className="text-gray-700 mb-4">
          <strong>{course.description}</strong>
        </p>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-gray-700">
              Price: <strong>{course.price}</strong>
            </span>
          </div>
          <div>
            <span className="text-gray-700">
              Estimated Price: <strong>{course.estimatedPrice}</strong>
            </span>
          </div>
          <div>
            <span className="text-gray-700">
              Duration: <strong>{course.duration}</strong> hours
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-gray-700">
              Number of Students: <strong>{course.numberOfStudents}</strong>
            </span>
          </div>
          <div>
            <span className="text-gray-700">
              Ratings: <strong>{course.ratings}</strong>
            </span>
          </div>
          <div>
            <span className="text-gray-700">
              Language: <strong>{course.language}</strong>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-gray-700">
              Category: <strong>{course.category.join(", ")}</strong>
            </span>
          </div>
          <div>
            <span className="text-gray-700">
              Tags: <strong>{course.tags.join(", ")}</strong>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-gray-700">
              Is Free: <strong>{course.isFree ? "Yes" : "No"}</strong>
            </span>
          </div>
          <div>
            <span className="text-gray-700">
              Is Published: <strong>{course.isPublished ? "Yes" : "No"}</strong>
            </span>
          </div>
        </div>
        <div>
          <Image
            src={course.thumbnail}
            alt={course.title}
            width={400}
            height={250}
          />
        </div>

        <div className="mt-4">
          <Button>Edit Course</Button>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
