"use client";

import { useState } from "react";
import { Input, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
        router.refresh(); // Refresh to update middleware/server state
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-full min-h-[60vh] px-4">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex justify-center pb-4">
          <h2 className="text-2xl font-bold text-primary">Admin Access</h2>
        </CardHeader>
        <CardBody className="space-y-6">
          <Input
            label="Username"
            variant="bordered"
            value={username}
            onValueChange={setUsername}
          />
          <Input
            label="Password"
            type="password"
            variant="bordered"
            value={password}
            onValueChange={setPassword}
          />
          {error && <p className="text-danger text-sm text-center">{error}</p>}
          <Button 
            color="primary" 
            isLoading={loading} 
            onPress={handleLogin}
            className="w-full font-semibold"
          >
            Login
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
