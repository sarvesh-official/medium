"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Blogs from "@/components/Blogs";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
    }
  }, [router]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    return null;
  }

  return (
    <>
      <Blogs />
    </>
  );
}
