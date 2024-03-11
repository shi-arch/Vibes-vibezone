"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push("/home")
  }, []);

  return (
    <h1>Welcome to Vibe Zone</h1>
  );
}
