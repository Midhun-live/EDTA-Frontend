"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { logout, getUser, DecodedToken } from "@/lib/auth";

export default function LogoutButton() {
  const router = useRouter();
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <div className="flex items-center gap-4">
      {user?.email && (
        <span className="text-sm font-medium text-gray-700">
          {user.email}
        </span>
      )}
      <Button variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}