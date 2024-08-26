"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import globalApi from "../(api)/globalApi";

export default function Home() {
    const [adminUser, setAdminUser] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    const router = useRouter();

    // Fetch the admin user data on component mount
    useEffect(() => {
        globalApi
            .getAdminUser()
            .then((resp) => {
                setAdminUser(resp.data);
                console.log("Fetched admin users:", resp.data); // Debugging
            })
            .catch((error) => {
                console.error("Error fetching admin user list:", error);
            });
    }, []);

    // Check authentication status on component mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const authenticated = sessionStorage.getItem("authenticated") === "true";
            if (authenticated) {
                setIsAuthenticated(true);
                router.push("/Dashboard");
            }
        }
    }, [router]);

    const handleSignIn = (event) => {
        event.preventDefault(); 
        const user = adminUser.find(
            (user) => 
                user.Email === email && 
                user.password === password
        );

  

        if (user) {
            setMessage("Sign in successful!");
            sessionStorage.setItem("authenticated", "true");
            router.push("/Dashboard");
        } else {
            setMessage("Invalid email or password.");
        }
    };

    if (isAuthenticated) {
        // Redirect to the dashboard if the user is authenticated
        return null;
    }

    return (
        <div className="h-screen w-screen bg-gray-50 flex flex-col justify-center items-center">
            <section className="bg-white w-full sm:max-w-md rounded-md p-10 flex flex-col gap-10">
                <div>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                </div>

                <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@company.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-black w-full text-white p-3 mt-3 rounded-md"
                    >
                        Sign In
                    </button>
                </form>
                {message && <div className="mt-4 text-red-500">{message}</div>}
            </section>
        </div>
    );
}
