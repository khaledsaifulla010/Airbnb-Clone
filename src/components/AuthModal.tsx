/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.literal("admin@gmail.com"), 
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login";
  onModeChange: Dispatch<SetStateAction<"login">>; 
}

export function AuthModal({
  isOpen,
  onClose,
  mode,
  onModeChange,
}: AuthModalProps) {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "",
    },
  });

  const onLoginSubmit: SubmitHandler<LoginForm> = async (data) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      onClose();
      loginForm.reset({ email: "admin@gmail.com", password: "" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "login" ? "Admin Login" : "Auth"}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={loginForm.handleSubmit(onLoginSubmit)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...loginForm.register("email")}
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...loginForm.register("password")}
              disabled={isLoading}
            />
            {loginForm.formState.errors.password && (
              <p className="text-sm text-red-600">
                {loginForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FF5A5F] hover:bg-[#E00007]"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : t("login")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
