import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";

export const Actions = async () => {
  const [user, setUser] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const isInstructorPage = pathname?.startsWith("/instructor");
  const isPlayerPage = pathname?.includes("/lesson");

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(user || "");
  }, []);

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {isInstructorPage || isPlayerPage ? (
        <Button size="sm" variant="ghost" onClick={() => router.push("/")}>
          <LogOut className="h-5 w-5 mr-2" />
          Exit
        </Button>
      ) : (
        <Link href="/instructor/course">
          <Button size="sm" variant="ghost">
            Instructor Mode
          </Button>
        </Link>
      )}
      {!user ? (
        <Button size="sm" onClick={() => router.push("/sign-in")}>
          <LogIn className="h-5 w-5 lg:mr-2" />
          Login
        </Button>
      ) : (
        <Button size="sm">Logout</Button>
      )}
    </div>
  );
};
