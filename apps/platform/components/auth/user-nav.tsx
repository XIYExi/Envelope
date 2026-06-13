"use client";

import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export function UserNav() {
  const router = useRouter();
  const { user, signOut } = useAuthStore();

  if (!user) return null;

  const initials = user.email?.slice(0, 2).toUpperCase() ?? "U";

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">{user.email}</span>
      <Avatar className="h-7 w-7">
        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
      </Avatar>
      <Button
        variant="ghost"
        size="sm"
        className="text-xs"
        onClick={async () => {
          await signOut();
          router.push("/login");
        }}
      >
        Sign out
      </Button>
    </div>
  );
}
