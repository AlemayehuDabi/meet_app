import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function SignUpView() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-700 to-violet-700 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form className="space-y-4">
            <Input type="text" placeholder="Full Name" className="rounded-xl" />
            <Input type="email" placeholder="Email" className="rounded-xl" />
            <Input
              type="password"
              placeholder="Password"
              className="rounded-xl"
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              className="rounded-xl"
            />
            <Button className="w-full rounded-xl hover:bg-gray-700 transition">
              Create Account
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?
            <Link
              href="/sign-in"
              className="text-blue-600 hover:underline cursor-pointer ml-1"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
