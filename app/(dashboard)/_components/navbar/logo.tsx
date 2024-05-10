import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <div className="flex items-center justify-center h-20">
      <Link href="/">
        <div className="flex gap-x-4 hover:opacity-75 transition">
          <div className={cn("hidden lg:block", font.className)}>
            <p className="text-lg font-semibold">Skill Plus</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
