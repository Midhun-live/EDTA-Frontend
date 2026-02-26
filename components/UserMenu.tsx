"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
    name: string;
    email: string;
};

export default function UserMenu({ name, email }: Props) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const ref = useRef<HTMLDivElement>(null);

    const initials = name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleLogout() {
        localStorage.removeItem("access_token");
        sessionStorage.removeItem("access_token");
        router.push("/login");
    }

    return (
        <div className="relative" ref={ref}>
            {/* Avatar */}
            <button
                onClick={() => setOpen(!open)}
                className="h-10 w-10 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center hover:opacity-90 transition"
            >
                {initials || "U"}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-3 w-64 bg-white border rounded-xl shadow-lg p-4 z-50 animate-in fade-in zoom-in-95">
                    <div className="mb-3">
                        <p className="font-medium text-gray-900">{name}</p>
                        <p className="text-sm text-gray-500 truncate">{email}</p>
                    </div>

                    <div className="border-t pt-3">
                        <button
                            onClick={handleLogout}
                            className="w-full text-left text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
