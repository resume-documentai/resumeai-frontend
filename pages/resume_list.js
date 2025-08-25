import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout';
import ResumeSummary from '../components/resumeSummary';
import Chat from '../components/chat';
import { motion, AnimatePresence } from "framer-motion";


const ResumeList = () => {
    const [resumes, setResumes] = useState([]);
    const [selectedResume, setSelectedResume] = useState("");
    const [resumeText, setResumeText] = useState("");
    const [resumeGeneralFeedback, setResumeGeneralFeedback] = useState("");
    const [resumeOverallScore, setResumeOverallScore] = useState("");
    const [resumeFeedback, setResumeFeedback] = useState("");
    const [isExtractedTextOpen, setExtractedTextOpen] = useState(false)
    const [selectedResumeTitle, setSelectedResumeTitle] = useState("")
    const [active, setActive] = useState("resumes"); // 'resumes' | 'chat' | 'none'

    const toggleTab = (tab) => setActive((prev) => (prev === tab ? "none" : tab));

    // When there's no selected resume, force the Resumes tab
    useEffect(() => {
      if (!selectedResume && active === "none") setActive("resumes");
    }, [selectedResume, active]);
  
    const origin = active === "resumes" ? "left" : "right";

    const fetchResumes = async () => {
        const userId = localStorage.getItem("userId");

        try {
            // Include userId as a query parameter in the request URL
            const response = await axios.get('/api/resumes/', {
                params: {user_id: userId}
            });

            setResumes(response.data);
        } catch (error) {
            console.error("Error fetching resumes:", error);
        }
    };

    useEffect(() => {
        fetchResumes();
    }, []);

    const handleSelectResume = async (resume) => {
        // Retrieve userId from local storage
        // const userId = localStorage.getItem("userId");

        // Create a FormData object and append user_id and file_id
        const formData = new FormData();
        formData.append("file_id", resume.file_id);

        try {
            // Send the FormData to the server
            const response = await axios.post("/api/resumes/file", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Use the response to set resumeText and resumeFeedback
            // TODO: fix resume feedback to show new json format
            setSelectedResume(resume);
            setSelectedResumeTitle(resume.file_name.replace(/\.[^.]+$/, ''))
            setResumeText(response.data.extracted_text);
            setResumeFeedback(response.data.feedback);
            setResumeGeneralFeedback(response.data.general_feedback);
            setResumeOverallScore(response.data.overall_score);
        } catch (error) {
            console.error("Error fetching resume details:", error);
        }
    }

    return (
        <Layout>
            <div className="h-full" style={{minHeight: `calc(100vh - 100px)`}}>
                {/* Desktop / tablet: two sidebars */}
                <div className="hidden md:grid md:grid-cols-[280px_1fr] ">
                    {/* Resume List - Left Sidebar */}
                    <aside className=" bg-gray-700 text-gray-100 shadow">
                        <div className="sticky top-0 h-full bg-gray-700 p-4 shadow-md">
                            <h2 className="text-lg font-bold mb-4 text-gray-200">Resumes</h2>
                            {resumes.length > 0 ? (
                                <ul>
                                    {resumes.map((resume) => (
                                        <li
                                            key={resume.file_id}
                                            className={`p-2 cursor-pointer ${selectedResume?.file_id === resume.file_id ? "bg-blue-300 rounded-full text-gray-700" : "hover:bg-gray-800 rounded-full text-gray-200"}`}
                                            onClick={() => handleSelectResume(resume)}
                                        >
                                            {resume.file_name.replace(/\.[^.]+$/, '')}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-gray-500">No resumes found.</p>
                            )}
                        </div>
                    </aside>
                    {/* Resume Viewer - Main Content */}
                    <section className=" min-h-[calc(100vh-100px)] overflow-hidden min-w-0" >
                        {selectedResume && (
                            <ResumeSummary
                            selectedResumeTitle={selectedResumeTitle}
                            resumeOverallScore={resumeOverallScore}
                            resumeText={resumeText}
                            resumeGeneralFeedback={resumeGeneralFeedback}
                            resumeFeedback={resumeFeedback}
                            isExtractedTextOpen={isExtractedTextOpen}
                            setExtractedTextOpen={setExtractedTextOpen}
                            />  
                        )}
                    </section>  
                    {/* Chat - Right Sidebar */}
                    {/* <aside className="bg-gray-700 shadow ">
                        <Chat fileId={selectedResume?.file_id} />
                    </aside> */}
                </div>

                {/* Mobile: tabs + animated panel */}
                <div className="md:hidden">
                
                    <div
                        className="flex w-full bg-gray-700 p-1 text-sm font-medium"
                        role="tablist"
                        aria-label="Resumes and Chat"
                    >
                        <button
                            role="tab"
                            aria-selected={true}
                            onClick={() => toggleTab("resumes")}
                            className={`flex-1 rounded-lg px-3 py-2 transition font-bold ${
                                active === "resumes"
                                ? "bg-gray-500 shadow text-gray-200"
                                : "text-gray-200 hover:text-gray-400"
                            }`}
                        >
                            Resumes
                        </button>
                        {/* <div className="self-center text-gray-400 px-1">|</div>
                        <button
                            role="tab"
                            aria-selected={active === "chat"}
                            onClick={() => toggleTab("chat")}
                            className={`flex-1 rounded-lg px-3 py-2 transition ${
                                active === "chat"
                                ? "bg-gray-500 shadow text-gray-200"
                                : "text-gray-200 hover:text-gray-800"
                            }`}
                        >
                            Chat
                        </button> */}
                    </div>
                

                {/* Animated content area */}
                {active !== "none" && (
                <div className="bg-gray-700 shadow overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active + String(!!selectedResume)}
                            initial={{ scaleY: 0.001, opacity: 0 }}
                            animate={{ scaleY: 1, opacity: 1 }}
                            exit={{ scaleY: 0.001, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            style={{ transformOrigin: origin === "left" ? "top" : "bottom" }}
                            >
                        {active == "resumes" ? (
                            <div className="px-4">
                                <hr className="border border-gray-600 mb-2" />
                                {resumes.length > 0 ? (
                                    <ul className="space-y-1">
                                    {resumes.map((resume) => (
                                        <li
                                        key={resume.file_id}
                                        className={`p-2 cursor-pointer ${
                                            selectedResume?.file_id === resume.file_id
                                            ? "bg-blue-300 rounded-full text-gray-700"
                                            : "hover:bg-gray-800 rounded-full text-gray-200"
                                        }`}
                                        onClick={() => handleSelectResume(resume)}
                                        >
                                        {resume.file_name.replace(/\.[^.]+$/, "")}
                                    </li>
                                    ))}
                                </ul>
                                ) : (
                                    <p className="text-center text-gray-500">No resumes found.</p>
                                )}
                            </div>
                        ) : (
                            <div className="p-4">
                            {selectedResume ? (
                                <Chat fileId={selectedResume.file_id} />
                            ) : (
                                <div className="text-gray-600 text-sm">
                                Select a resume first to start chatting.
                            </div>
                            )}
                        </div>
                        )}
                        </motion.div>
                    </AnimatePresence>
                </div>
                )}

                {/* Main display under the tabs when a resume is selected */}
                {selectedResume && (
                    <ResumeSummary
                        selectedResumeTitle={selectedResumeTitle}
                        resumeOverallScore={resumeOverallScore}
                        resumeText={resumeText}
                        resumeGeneralFeedback={resumeGeneralFeedback}
                        resumeFeedback={resumeFeedback}
                        isExtractedTextOpen={isExtractedTextOpen}
                        setExtractedTextOpen={setExtractedTextOpen}
                    />
                )}
                </div>
            </div>
        </Layout>
    );
}

export default ResumeList;