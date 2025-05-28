"use client"
import { LandingPage } from "./Components/LandingPage/LandingPage";
import { useRouter } from "next/router";
import { AuthContext } from "./Context/AuthContext";
import { useContext, useState } from "react";

export default function Home() {
  const { AuthData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LandingPage/>
  );
}
// }
