import { SignUpForm } from "@/components/auth/sign-up-form";
import { AuthWrapper } from "@/components/auth/auth-wrapper";

export default function SignUpPage() {
  return (
    <AuthWrapper>
      <SignUpForm />
    </AuthWrapper>
  );
}
