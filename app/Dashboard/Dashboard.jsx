'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Main from './Main'

function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    const authStatus = sessionStorage.getItem("authenticated");

    if (authStatus !== "true") {
      // Redirect to the login page if not authenticated
      router.push("/");
    } else {
      // Set authenticated state to true if user is authenticated
      setIsAuthenticated(true);
    }
  }, [router]);

  // Render the dashboard only if the user is authenticated
  return (
    <div>
      {isAuthenticated ? (
        <Main/>
      ) : (
        <p className="h-screen w-screen bg-black text-white flex flex-col justify-center items-center" >Redirecting...</p>
      )}
    </div>
  );
}

export default Dashboard;