import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AuthPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="grid w-full text-center gap-4">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit">Sign up</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <CardDescription>
            Already have an account?{" "}
            <a href="/sign-in" className="text-blue-500">
              Sign in
            </a>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
