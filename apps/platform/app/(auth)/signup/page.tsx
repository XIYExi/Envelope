import { SignupForm } from "@/components/auth/signup-form";
import { redirect } from "next/navigation";
import { getPlatformBackendConfig } from "@/lib/backend/config";

export default function SignupPage() {
  const backendConfig = getPlatformBackendConfig();
  if (backendConfig.mode === "local") {
    redirect("/inner");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <SignupForm />
    </div>
  );
}
