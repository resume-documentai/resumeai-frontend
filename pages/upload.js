import React, { useEffect, useState, useCallback } from "react"
import axios from "axios"
import { useDropzone } from "react-dropzone"
import Layout from "../components/layout"
import ResumeFeedback from "../components/feedback"

const Upload = () => {
    const [resumeText, setResumeText] = useState("");
    const [resumeFeedback, setResumeFeedback] = useState("");
    const [modelOption, setModelOption] = useState("openai");
    const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);


    useEffect(() => {
        const savedModel = localStorage.getItem("aiModel");
        if (savedModel) setModelOption(savedModel);
    }, []);

    const handleSelect = (model) => {
        const newModel = model;
        localStorage.setItem("aiModel", newModel);
        console.log("Model Option saved in localstorage:", newModel);
        setModelOption(model);
        return model;
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]
        },
        onDrop: async (acceptedFiles) => {
            console.log(acceptedFiles[0].type);
            const formData = new FormData();
            const userId = localStorage.getItem("userId");
            
            formData.append("file", acceptedFiles[0]);
            formData.append("modelOption", modelOption);
            if (userId) {
                formData.append("user_id", userId);
            }

            try {
                // Send file to backend for extraction
                const response = await axios.post("api/resumes/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                
                setResumeText(response.data.extracted_text); // Set extracted text to state
                setResumeFeedback(response.data.feedback); // Set feedback from LLM to state
            } catch (error) {
                console.error("Error uploading file:", error); // Handle error
            }
        },
    });

    return (
        <Layout>
            <div className="h-full flex flex-col items-center justify-center p-4" style={{minHeight: `calc(100vh - 56px - 128px)`}}>
                <div className="p-6 bg-gray-300 rounded-lg shadow-lg w-96 text-center">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">Upload Your Resume</h2>
                    <div {...getRootProps()} className="border-2 border-dashed border-gray-400 p-6 cursor-pointer mb-4 ">
                        <input {...getInputProps()} />
                        <p>Drag and Drop your resume, or click to select a file.</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-full">
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsModelSelectorOpen(!isModelSelectorOpen);
                                }}
                                className="flex items-center justify-center w-full text-left text-lrg font-bold mb-2 "
                            >
                                <svg 
                                    className={`w-5 h-5 transform transition-transform ${!isModelSelectorOpen ? 'rotate-180' : ''}`}
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                    >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>                            
                                <span className="px-2 text-gray-700">Select Your AI Model</span>
                            </button>
                            
                            <div 
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    isModelSelectorOpen ? 'max-h-40' : 'max-h-0'
                                }`}
                            >
                                <div className="flex items-center bg-gray-200 rounded-full p-1 w-48 mx-auto">
                                    <button
                                        className={`w-1/2 py-2 text-center text-sm font-semibold rounded-full transition ${
                                            modelOption === "openai" ? "bg-blue-400 text-white" : "text-gray-600"
                                        }`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelect("openai");
                                        }}
                                    >
                                        OpenAI
                                    </button>
                                    <button
                                        className={`w-1/2 py-2 text-center text-sm font-semibold rounded-full transition ${
                                            modelOption === "ollama" ? "bg-blue-400 text-white" : "text-gray-600"
                                        }`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelect("ollama");
                                        }}
                                    >
                                        Ollama
                                    </button>
                                </div>
                                <p className="mt-4 text-gray-800">
                                    Selected Model: <strong className="font-semibold">{modelOption}</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <ResumeFeedback feedback={resumeFeedback} />
            </div>
        </Layout>
    );
}

export default Upload;