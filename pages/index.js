import React from "react";
import Layout from "../components/layout";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

const Home = () => {    
    const { user } = useAuth();

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center p-4" style={{minHeight: `calc(100vh - 100px)`}}>
                <h1 className="text-3xl font-bold text-gray-200 mb-4">Resume AI</h1>
                <p className="px-4 text-lg text-center text-gray-200">Analyzes your resume in seconds and receive actionable feedback to help you stand out. Whether you're applying for your first internship or your dream job, we help you highlight what matters.</p>
                <div className="w-full mt-4 flex justify-center space-x-6">
                    {user ? (
                        <>
                            <Link href="/resume_list" className="w-1/3 p-2 bg-blue-400 text-gray-200 items-center justify-center text-center rounded-full">Resume List</Link>
                            <Link href="/upload" className="w-1/3 p-2 bg-blue-400 text-gray-200 items-center justify-center text-center rounded-full">Upload Resume</Link>
                        </>
                    ) : (
                        <Link href="/login" className="w-1/3 p-2 bg-blue-400 text-gray-200 items-center justify-center text-center rounded-full">Login</Link>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Home;