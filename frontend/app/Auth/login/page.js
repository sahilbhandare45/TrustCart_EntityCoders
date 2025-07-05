"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useappcontext from "@/app/Hook";
import { Button } from "@/components/ui/button";

export default function Login() {
  const { email, setEmail } = useappcontext();
  const { password, setPassword } = useappcontext();
  const { handlepush } = useappcontext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");

    if (!email || !password) {
      alert("Email and password are required.");
      return;
    }
    handlepush("/Dashboard/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-500 flex items-center justify-center p-6">
      <Card className="w-full max-w-md rounded-3xl shadow-2xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-extrabold text-gray-800">Welcome Back</CardTitle>
          <CardAction>
            <a href="/Auth/signup" className="text-sm text-blue-500 hover:underline">
              Don't have an account? Signup
            </a>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <a href="#" className="text-sm text-blue-500 hover:underline">
                    Forgot?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition duration-200"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
