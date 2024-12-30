"use client"

import { SignInForm } from "@/components/auth/sign-in-form";
import { AuthWrapper } from "@/components/auth/auth-wrapper";

export default function SignInPage() {
  return (
    <AuthWrapper>
      <SignInForm />
    </AuthWrapper>
  );
}
