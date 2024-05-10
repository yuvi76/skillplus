import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LogIn } from "lucide-react";

export const Actions = async () => {
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(user || "");
  }, []);

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!user ? (
        <Button size="sm" onClick={() => router.push("/sign-in")}>
          <LogIn className="h-5 w-5 lg:mr-2" />
          Login
        </Button>
      ) : (
        <Button size="sm">Logout</Button>
      )}
      {/* {!!user && (
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${user.username}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      )} */}
    </div>
  );
};
