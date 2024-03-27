"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { setLoginDetails } from "../Context/features/loginSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch();

  useEffect(() => {
    router.push("/home")  
  }, []);

  return (
    <h1>Welcome to Vibe Zone</h1>
  );
}
