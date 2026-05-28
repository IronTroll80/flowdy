"use client";

import { useRouter } from "next/navigation";
import styles from './goBack.module.css'
import { LuArrowLeft } from "react-icons/lu";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button className={styles.goBack} onClick={handleBack}>
        <LuArrowLeft />
    </button>
  );
}