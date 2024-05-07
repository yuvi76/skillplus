"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const VerifyEmailPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [showLoader, setShowLoader] = React.useState(false);

  React.useEffect(() => {
    const verifyEmail = async () => {
      const path = window.location.pathname;
      const parts = path.split("/");
      const token = parts[2];
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      setShowLoader(true);

      try {
        const response = await axios.get(apiUrl + "auth/verify-email/" + token);
        if (response.data.statusCode === 200) {
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

    verifyEmail();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      {showLoader ? (
        <Loader2 size={60} />
      ) : (
        <div>
          <h1 className="text-2xl font-bold">Verifying Email...</h1>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
