"use client"
import Image from "next/image";
import { MainAuth } from "./Components/Auth/Main";
import { LandingPage } from "./Components/LandingPage/LandingPage";

export default function Home() {
  const { AuthData } = useContext(AuthContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LandingPage/>
  );
}
// }
