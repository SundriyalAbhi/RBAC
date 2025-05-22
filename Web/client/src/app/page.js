"use client"
import Image from "next/image";
import { MainAuth } from "./Components/Auth/Main";

export default function Home() {
  const { AuthData } = useContext(AuthContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (!AuthData.token) {
  //     router.push("/AuthForm"); // Redirect if not authenticated
  //   } else {
  //     setIsLoading(false); // Allow rendering when authenticated
  //   }
  // }, [AuthData, router]);

  // if (isLoading) {
  //   return null; // Prevent rendering until authentication is checked
  // } else {
  return (
    <MainAuth/>
    <>
      <Main />
      {/* <Admin /> */}
    </>
  );
}
// }
