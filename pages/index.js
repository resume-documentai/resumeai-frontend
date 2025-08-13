import React from "react";
import Layout from "../components/layout";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

const Home = () => {    
    const { user } = useAuth();

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center p-4" style={{minHeight: `calc(100vh - 100px)`}}>
                <h1 className="text-3xl font-bold text-gray-200 mb-4">Resume Reviewer</h1>
                <p className="text-lg text-center text-gray-200">Upload your resume to get a detailed review and feedback or login to see a previously analyzed resume.</p>
                <div className="w-full mt-4 flex justify-center space-x-6">
                    {user ? (
                        <Link href="/resume_list" className="w-1/3 p-2 bg-blue-400 text-gray-200 text-center rounded-full">Resume List</Link>
                    ) : (
                        <Link href="/login" className="w-1/3 p-2 bg-blue-400 text-gray-200  text-center rounded-full">Login</Link>
                    )}
                        <Link href="/upload" className="w-1/3 p-2 bg-blue-400 text-gray-200  text-center rounded-full">Upload Resume</Link>
                </div>
            </div>
        </Layout>
    );
}

export default Home;