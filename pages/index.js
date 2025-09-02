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
                {/* Hero Section */}
                <div className="grid grid-cols-6 grid-flow-row place-content-center w-full gap-4 inset-shadow-lg inset-shadow-black bg-gray-800">
                    <div className="row-start-1 col-span-5 h-20"/> {/* Upper Padding */}
                    <div className="col-span-1 row-span-4"/> {/* Right Padding */}
                    <div className="row-start-2 col-span-1"/> {/* Left Text Padding */}
                    <h1 className="col-span-2 grid-rows-subgrid font-bold text-gray-200 p-4 max-w-xl place-content-center">
                        <span className="row-start-1 block text-[clamp(1.5rem,4vw,4rem)] leading-tight">Analyze your</span>
                        <span className="row-start-2 block text-[clamp(1.5rem,4vw,4rem)] leading-tight">resume in  </span>
                        <span className="row-start-3 block text-[clamp(1.5rem,4vw,4rem)] leading-tight">seconds.</span>
                    </h1>
                    <div className="col-span-2 row-span-2 flex items-center justify-center pt-4 px-4 max-w-xl">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <img    
                                src="/images/presentation_display_example.png" 
                                alt="Presentation Display Example" 
                                className="w-fit h-fit object-cover"
                            />
                        </div>
                    </div>

                    <div className="row-start-3 col-span-1"/> {/* Left Button Padding*/}
                    <div className="col-span-1 w-full flex justify-center h-max-fit">
                        {user ? (
                            <div className="grid grid-cols-1 grid-rows-2 gap-2 w-full">
                                <Link href="/resume_list" className="col-span-1 row-start-1 p-2 h-10 bg-blue-500 text-gray-200 items-center justify-center text-center rounded">Resume List</Link>
                                <Link href="/upload" className="col-span-1 row-start-2 p-2 h-10 bg-blue-500 text-gray-200 items-center justify-center text-center rounded">Upload Resume</Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-2 w-full ">
                                <Link href="/login" className="col-start-1 p-2 h-10 bg-blue-500 text-gray-200 items-center justify-center text-center rounded">Login</Link>
                            </div>
                        )}
                    </div>
                    <div className="row-start-4 col-span-5 h-20"/> {/* Bottom Padding */}
                </div>
                {/* Why use Section */}
                <div className="grid grid-cols-6 grid-flow-row w-full gap-8">
                    <div className="row-start-1 col-span-6 h-4"/> {/* Upper Padding */}
                    
                    <div className="row-start-2 col-span-1"/> {/* Left Padding */}
                    <div className="col-span-4 flex flex-row w-full min-w-0">
                        <div className="flex items-center justify-center pr-4"> 
                            <div className="rounded-full h-26 w-26 border bg-gray-600 place-items-center place-content-center shadow-md shadow-black">
                                <img src="upload.svg" alt="Upload" className="w-14 h-14 object-contain" />
                            </div>
                        </div>
                        <div className="flex-grow bg-gray-600 rounded-2xl p-4 shadow-md shadow-black w-full h-auto min-w-0">
                            <h2 className="whitespace-nowrap leading-tight font-bold text-gray-200">
                                Simply Upload and Go
                            </h2>
                            <hr className="border-gray-400 m-1 mb-2"/>
                            <p className="text-gray-200 w-full clamp-3">
                                No forms, no typing! Just drop in your resume and let our AI do the rest. There's no need to re-enter experiences or skills.
                            </p>
                        </div>
                    </div>


                    <div className="row-start-3 col-span-1 "/> {/* Left Padding */}
                    <div className="col-span-4 flex flex-row w-full min-w-0">
                        <div className="flex-grow bg-gray-600 rounded-2xl p-4 shadow-md shadow-black w-full h-auto min-w-0">
                            <h2 className="whitespace-nowrap leading-tight font-bold text-gray-200">
                                Get Actionable Insights and Feedback
                            </h2>
                            <hr className="border-gray-400 m-1 mb-2"/>
                            <p className="text-gray-200 w-full h-auto clamp-3 ">
                                Our AI analyzes your resume and provides personalized insights, tailored recommendations, and specific feedback to help optimize your resume for success.
                            </p>
                        </div>
                        <div className="flex items-center justify-center pl-4"> 
                            <div className="rounded-full h-26 w-26 border bg-gray-600 place-items-center place-content-center shadow-md shadow-black">
                                <img src="target.svg" alt="Target" className="w-14 h-14 object-contain" />
                            </div>
                        </div>
                    </div>

                    <div className="row-start-4 col-span-1 "/> {/* Left Padding */}
                    <div className="col-span-4 flex flex-row w-full min-w-0">
                        <div className="flex items-center justify-center pr-4"> 
                            <div className="rounded-full h-26 w-26 border bg-gray-600 place-items-center place-content-center shadow-md shadow-black">
                                <img src="chat-arrow-grow.svg" alt="Grow" className="w-14 h-14 object-contain" />
                            </div>
                        </div>
                        <div className="flex-grow bg-gray-600 rounded-2xl p-4 shadow-md shadow-black w-full h-auto min-w-0">
                            <h2 className="whitespace-nowrap leading-tight font-bold text-gray-200">
                                See Your Progress and Improve Over Time
                            </h2>
                            <hr className="border-gray-400 m-1 mb-2"/>
                            <p className="text-gray-200 w-full h-auto clamp-3 ">
                                Reupload updated versions and track how your resume evolves with real time feedback every step of the way.
                            </p>
                        </div>
                    </div>
                    
                    <div className="row-start-5 col-span-1 "/> {/* Left Padding */}
                    <div className="col-span-4 flex flex-row w-full min-w-0">
                        <div className="flex-grow bg-gray-600 rounded-2xl p-4 shadow-md shadow-black w-full h-auto min-w-0">
                            <h2 className="whitespace-nowrap leading-tight font-bold text-gray-200">
                                Your Central Resume Hub
                            </h2>
                            <hr className="border-gray-400 m-1 mb-2"/>
                            <p className="text-gray-200 w-full h-auto clamp-3 ">
                                Securely store, manage, and revisit past resume uploads all in one place. Think of it as your own personal resume repository.
                            </p>
                        </div>
                        <div className="flex items-center justify-center pl-4"> 
                            <div className="rounded-full h-26 w-26 border bg-gray-600 place-items-center place-content-center shadow-md shadow-black">
                                <img src="database.svg" alt="Database" className="w-14 h-14 object-contain" />
                            </div>
                        </div>
                    </div>

                    <div className="row-start-6 col-span-6 h-4 "/> {/* Bottom Padding*/}



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