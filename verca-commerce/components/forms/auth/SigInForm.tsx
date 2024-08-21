"use client";

import SignIn from "@/app/auth/signup/page";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/shop";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });
      console.log("Res", res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("Invalid email or password");
      }
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
      {error && <div className="alert alert-error">{error}</div>}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          className="w-full"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          className="w-full"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
        />
      </div>
      <div className="w-full">
        <Button className="w-full" size="lg">
          {isLoading ? "Loading..." : "Sign In"}
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
