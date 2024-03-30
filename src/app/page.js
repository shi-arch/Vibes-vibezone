


import styles from "./page.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setLoginDetails } from "../Context/features/loginSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const router = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    router("/home")  
  }, []);

  return (
    <h1>Welcome to Vibe Zone</h1>
  );
}
