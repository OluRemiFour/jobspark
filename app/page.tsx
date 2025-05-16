// "use client";
// import { useEffect, useState } from "react";
// import { Loader } from "./components/Loader";
// import { useAuth } from "./context/AuthContext";
// import Index from "./index/page";
// import { usePathname } from "next/navigation";

// export default function Home() {
//   const [isLoading, setIsLoading] = useState(true);
//   const { isAuthenticated } = useAuth();
//   const pathName = usePathname();
//   const protectRoutes = ["/user"];

//   // Simulate initial loading
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   if (!isAuthenticated && protectRoutes.includes(pathName)) {
//     // Redirect to login page if not authenticated
//     return (window.location.href = "/");
//   }

//   if (isLoading) {
//     return <Loader message="Loading JobSpark..." />;
//   }

//   return <Index />;
// }

"use client";
import { useEffect, useState } from "react";
import { Loader } from "./components/Loader";
import Index from "@/app/index/page";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader message="Loading JobSpark..." />;
  }

  return <Index />;
}
