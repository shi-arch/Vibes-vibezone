"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import axios from "axios";

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    axios.post("http://localhost:8080/api/guest").then(result => {
      console.log(result)
      debugger
    })
   /// router.push("/home")
  }, []);

  return (
    <h1>Welcome to Vibe Zone</h1>
  );
}
