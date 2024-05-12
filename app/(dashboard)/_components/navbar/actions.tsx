"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LogIn, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Actions = () => {
  const [user, setUser] = useState<{ userAvatar?: string }>({});
  const pathname = usePathname();
  const router = useRouter();

  const isInstructorPage = pathname?.startsWith("/instructor");
  const isPlayerPage = pathname?.includes("/lesson");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/sign-in");
  };

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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user?.userAvatar} />
              <AvatarFallback>YY</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
