"use client";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password, // user password -> min 8 characters by default
        name, // user display name
      },
      {
        onRequest: (ctx) => {
          //show loading
          setLoading(true);
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          if (ctx.data) {
            alert("success");
          }
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error);
          console.log(ctx.error);
        },
      }
    );
  };

  return (
    <div className="px-10 py-10">
      <Input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" onClick={onSubmit}>
        {loading ? <span>loading .....</span> : <span>submit</span>}
      </Button>
    </div>
  );
}
