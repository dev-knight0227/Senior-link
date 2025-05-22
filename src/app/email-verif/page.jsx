"use client";
import { useEffect } from "react";
import { auth } from "@/firebase/auth";
import { useRouter } from "next/navigation";

export default function VerifyEmail() {
  const router = useRouter();

  useEffect(() => {
    const checkVerification = async () => {
      await auth.currentUser?.reload();
      if (auth.currentUser?.emailVerified) {
        router.push("/"); // go to home or dashboard
      }
    };

    const interval = setInterval(checkVerification, 3000); // check every 3 sec
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6">
      <div className="max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-[#0077C8] mb-4">Verify Your Email</h2>
        <p className="text-gray-600 mb-2">
          A verification email has been sent to your inbox. Please check your email and verify your address.
        </p>
        <p className="text-sm text-gray-400">
          Once verified, this page will automatically redirect.
        </p>
      </div>
    </div>
  );
}
