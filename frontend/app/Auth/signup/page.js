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
import React from "react";
import { Button } from "@/components/ui/button";

export default function Signup() {
  const { email, setEmail } = useappcontext();
  const { password, setPassword } = useappcontext();
  const { name, setName } = useappcontext();
  const { confirmPassword, setConfirmPassword } = useappcontext();
  const { phone, setPhone } = useappcontext();
  const { role, setRole } = useappcontext();
  const router = useappcontext();
  const { handlepush } = useappcontext();
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name || !phone || !role) {
      alert("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
    setPhone("");
    setRole("");
    handlepush("/Auth/login");
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 p-4">
      <Card className="w-full max-w-md rounded-3xl shadow-2xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-extrabold text-gray-800">
            Create New Account
          </CardTitle>
          <CardAction>
            <a
              href="/Auth/login"
              className="text-sm text-blue-600 hover:underline"
            >
              Already have an account? Login
            </a>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="rounded-xl px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="rounded-xl px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="rounded-xl px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                >
                  <option value="">Select your role</option>
                  <option value="user">User</option>
                  <option value="lawyer">Lawyer</option>
                  <option value="journalist">Journalist</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-xl px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-type password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="rounded-xl px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition duration-200"
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}