import React from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

const Layout = ({ children }) => {
    const { user, logout } = useAuth();

    return (
        <div className="flex flex-col h-screen">
            <header className="bg-white shadow-md flex-shrink-0">
                <div className="mx-auto flex items-center justify-between p-4">
                    <h1 className="text-3xl font-bold text-gray-900 flex-grow-0">
                        <Link href="/" className="hover:text-blue-500">Resume Reviewer</Link>
                    </h1>
                    <nav className="flex-grow">
                        <ul className="flex justify-end space-x-6 items-center">
                            <li>
                                <Link href="/" className="text-gray-700 hover:text-blue-500">Home</Link>
                            </li>
                            <li>
                                <Link href="/upload" className="text-gray-700 hover:text-blue-500">Upload</Link>
                            </li>
                            <li className="border-l border-gray-300 h-6 mx-2"></li>
                            {user ? (
                                <>
                                    <li>
                                        <Link href="/resume_list" className="text-gray-700 hover:text-blue-500">My Resumes</Link>
                                    </li>
                                    <li className="text-gray-700">Welcome, <strong>{user}</strong></li>
                                    <li>
                                        <button
                                            onClick={logout}
                                            className="text-red-500 hover:text-red-700 border border-red-500 px-3 py-1 rounded"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link href="/login" className="text-gray-700 hover:text-blue-500">Login</Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
            <main className="flex-grow overflow-auto">
                {children}
            </main>
            <footer className="bg-white shadow-md flex-shrink-0 p-1 text-right">
                <p>&copy; 2025 Ashwin </p>
            </footer>
        </div>
    );
};

export default Layout;