import React from "react";
import { useAuth } from "../context/AuthContext";
import Header from "./header";

const Layout = ({ children }) => {
    const { user, logout } = useAuth();

    return (
        <div className="flex flex-col min-h-screen">
            <Header user={user} logout={logout} />
            <main className="pt-16 flex-grow overflow-auto bg-gray-900 z-10">
                {children}
            </main>
            <footer className="bg-gray-600 shadow-md p-1 text-right mt-auto text-gray-200 h-8">
                <p>&copy; 2025 Ashwin </p>
            </footer>
        </div>
    );
};

export default Layout;