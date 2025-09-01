import React from "react";
import Layout from "../components/layout";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

const Home = () => {    
    const { user } = useAuth();

    return (
        <Layout>
            {/* Desktop */}
            <div className="hidden md:block">
            <div className="flex flex-col" style={{minHeight: `calc(100vh - 100px)`}}>


                <div className="grid grid-cols-6 grid-flow-row items-left justify-left w-full gap-4 inset-shadow-md inset-shadow-black bg-gray-800">
                    <div className="row-start-1 col-span-5 h-24"/> {/* Upper Padding */}
                    <div className="col-span-1 row-span-4 "/> {/* Right Padding */}
                    <div className="row-start-2 col-span-1 "/> {/* Left Text Padding */}
                    <h1 className="col-span-2 line-clamp-3 sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-200 p-4 min-w-65">Analyze your resume in seconds.</h1>
                    <div className="col-span-2 row-span-2 flex items-center justify-center pt-4 px-4">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <img    
                                src="/images/presentation_display_example.png" 
                                alt="Presentation Display Example" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="row-start-3 col-span-1 "/> {/* Button Padding*/}
                    <div className="col-span-2 w-full flex justify-center h-max-fit">
                        {user ? (
                            <div className="grid grid-cols-1 grid-rows-2 gap-2 w-full">
                                <Link href="/resume_list" className="col-span-1 row-start-1 p-2 bg-blue-500 text-gray-200 items-center justify-center text-center rounded">Resume List</Link>
                                <Link href="/upload" className="col-span-1 row-start-2 p-2 bg-blue-500 text-gray-200 items-center justify-center text-center rounded">Upload Resume</Link>
                            </div>
                        ) : (
                            <Link href="/login" className="col-start-1 p-2 bg-blue-500 text-gray-200 items-center justify-center text-center rounded">Login</Link>
                        )}
                    </div>
                    <div className="row-start-4 col-span-3 h-24"/> {/* Bottom Padding */}
                </div>
            </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden">
            <div className="flex flex-col items-center justify-center p-4 inset-shadow-md inset-shadow-blue-900" style={{minHeight: `calc(100vh - 100px)`}}>
                {/* <h1 className="text-3xl font-bold text-gray-200 mb-4">Resume AI</h1> */}

                <div className="grid grid-cols-6 items-left justify-left border-2 border-gray-500 w-full">
                    <div className="col-span-1 border-2"/> {/* Spacer */}
                    <h1 className=" col-span-2 line-clamp-3 sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-200 p-4 border-2" >Analyze your resume in seconds.</h1>
                    <div className="col-span-2 border-2"/> {/* Spacer */}
                </div>

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
            </div>
        </Layout>
    );
}

{
    /* 
    <p className="px-4 text-lg text-center text-gray-200">Analyzes your resume in seconds and receive actionable feedback to help you stand out. 
    Whether you&#39;re applying for your first internship or your dream job, we help you highlight what matters.</p> */
}

export default Home;