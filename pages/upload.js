import React, { useEffect, useState, useCallback } from "react"
import axios from "axios"
import { useDropzone } from "react-dropzone"
import Layout from "../components/layout"

const Upload = () => {
    const [resumeText, setResumeText] = useState("");
    const [resumeFeedback, setResumeFeedback] = useState("");
    const [modelOption, setModelOption] = useState("openai");
    const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
    const [isGrammarOpen, setIsGrammarOpen] = useState(false);
    const [isClarityOpen, setIsClarityOpen] = useState(false)
    const [isImpactOpen, setIsImpactOpen] = useState(false)
    const [isStructureOpen, setIsStructureOpen] = useState(false)
    const [isAtsOpen, setIsAtsOpen] = useState(false)

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
                {resumeFeedback && (
                    <div className="flex flex-col w-full rounded-xl  mt-4 rounded-lg bg-gray-600">
                        <h1 className="text-2xl font-bold p-4 shadow-md text-gray-400 bg-gray-700 rounded-t-lg">Feedback</h1>

                        <div className="flex flex-col justify-left">
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsGrammarOpen(!isGrammarOpen);
                                }}
                                className="flex flex-row items-center justify-start space-x-4 p-2"
                            >
                                <svg 
                                    className={`w-5 h-5 transform transition-transform ${!isGrammarOpen ? 'rotate-180' : ''}`}
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                    >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                <div
                                    className={`flex items-center justify-center w-12 h-12 rounded-full ${
                                        resumeFeedback.grammar_spelling.score >= 8
                                            ? "bg-green-500"
                                            : resumeFeedback.grammar_spelling.score >= 5
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                    }`}
                                >
                                    <span className="text-lg font-bold">{resumeFeedback.grammar_spelling.score}</span>
                                </div>
                                <h4 className="text-lg font-bold text-left w-96 text-gray-300">Grammar & Spelling</h4>
                            </button>
                            <div 
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    isGrammarOpen ? 'max-h-96' : 'max-h-0'
                                }`}
                            >
                                <hr className="border border-gray-700 mx-4 rounded-full" />
                                <div className="p-2">
                                    <h4 className="text-lg font-semibold mb-2 text-gray-300">Strengths</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-100">
                                        {resumeFeedback.grammar_spelling.strengths.map((strength, index) => (
                                            <li key={index}>{strength}</li>
                                        ))}
                                    </ul>
                                    <h4 className="text-lg font-semibold mb-2 text-gray-300">Weaknesses</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-100">
                                        {resumeFeedback.grammar_spelling.weaknesses.map((weakness, index) => (
                                            <li key={index}>{weakness}</li>
                                        ))}
                                    </ul>
                                    <h4 className="text-lg font-semibold mb-2 text-gray-300">Suggestions</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-100">
                                        {resumeFeedback.grammar_spelling.suggestions.map((suggestion, index) => (
                                            <li key={index}>{suggestion}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-left">
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsClarityOpen(!isClarityOpen);
                                }}
                                className="flex flex-row items-center justify-start space-x-4 p-2"
                            >
                                <svg 
                                    className={`w-5 h-5 transform transition-transform ${!isClarityOpen ? 'rotate-180' : ''}`}
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                <div
                                    className={`flex items-center justify-center w-12 h-12 rounded-full ${
                                        resumeFeedback.clarity_conciseness.score >= 8
                                            ? "bg-green-500"
                                            : resumeFeedback.clarity_conciseness.score >= 5
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                    }`}
                                >
                                    <span className="text-lg font-bold">{resumeFeedback.clarity_conciseness.score}</span>
                                </div>
                                <h4 className="text-lg font-bold text-left w-96 text-gray-300">Clarity & Conciceness</h4>
                            </button>
                            <div 
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    isClarityOpen ? 'max-h-96' : 'max-h-0'
                                }`}
                            >
                                <hr className="border border-gray-700 mx-4 rounded-full" />
                                <div className="p-2">
                                    <h4 className="text-lg font-semibold mb-2 text-gray-300">Strengths</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-100">
                                        {resumeFeedback.clarity_conciseness.strengths.map((strength, index) => (
                                            <li key={index}>{strength}</li>
                                        ))}
                                    </ul>
                                    <h4 className="text-lg font-semibold mb-2 text-gray-300">Weaknesses</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-100">
                                        {resumeFeedback.clarity_conciseness.weaknesses.map((weakness, index) => (
                                            <li key={index}>{weakness}</li>
                                        ))}
                                    </ul>
                                    <h4 className="text-lg font-semibold mb-2 text-gray-300">Suggestions</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-100">
                                        {resumeFeedback.clarity_conciseness.suggestions.map((suggestion, index) => (
                                            <li key={index}>{suggestion}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-left">
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsImpactOpen(!isImpactOpen);
                                }}
                                className="flex flex-row items-center justify-start space-x-4 p-2"
                                >
                                <svg 
                                    className={`w-5 h-5 transform transition-transform ${!isImpactOpen ? 'rotate-180' : ''}`}
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                <div
                                    className={`flex items-center justify-center w-12 h-12 rounded-full ${
                                        resumeFeedback.impact_accomplishments.score >= 8
                                            ? "bg-green-500"
                                            : resumeFeedback.impact_accomplishments.score >= 5
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                    }`}
                                >
                                    <span className="text-lg font-bold">{resumeFeedback.impact_accomplishments.score}</span>
                                </div>
                                <h4 className="text-lg font-bold text-left w-96 text-gray-300">Impact & Accomplishments</h4>
                            </button>
                            <div 
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    isImpactOpen ? 'max-h-96' : 'max-h-0'
                                }`}
                            >
                                <hr className="border border-gray-700 mx-4 rounded-full" />
                                <div className="p-2">
                                    <h4 className="text-lg font-semibold mb-2 text-gray-300">Strengths</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-100">
                                        {resumeFeedback.impact_accomplishments.strengths.map((strength, index) => (
                                            <li key={index}>{strength}</li>
                                        ))}
                                    </ul>
                                    <h4 className="text-lg font-semibold mb-2 text-gray-300">Weaknesses</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-100">
                                        {resumeFeedback.impact_accomplishments.weaknesses.map((weakness, index) => (
                                            <li key={index}>{weakness}</li>
                                        ))}
                                    </ul>
                                    <h4 className="text-lg font-semibold mb-2 text-gray-300">Suggestions</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-100">
                                        {resumeFeedback.impact_accomplishments.suggestions.map((suggestion, index) => (
                                            <li key={index}>{suggestion}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-left">
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsStructureOpen(!isStructureOpen);
                                }}
                                className="flex flex-row items-center justify-start space-x-4 p-2"
                            >
                                <svg 
                                    className={`w-5 h-5 transform transition-transform ${!isStructureOpen ? 'rotate-180' : ''}`}
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                <div
                                    className={`flex items-center justify-center w-12 h-12 rounded-full ${
                                        resumeFeedback.structure_organization.score >= 8
                                            ? "bg-green-500"
                                            : resumeFeedback.structure_organization.score >= 5
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                    }`}
                                >
                                    <span className="text-lg font-bold">{resumeFeedback.structure_organization.score}</span>
                                </div>
                                <h4 className="text-lg font-bold text-left w-96 text-gray-300">Structure & Organization</h4>
                            </button>
                            <div 
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    isStructureOpen ? 'max-h-96' : 'max-h-0'
                                }`}
                            >
                                <hr className="border border-gray-700 mx-4 rounded-full" />
                                <div className="p-2">
                                    <h4 className="text-lg font-semibold mb-2 text-gray-300">Strengths</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-100">
                                        {resumeFeedback.structure_organization.strengths.map((strength, index) => (
                                            <li key={index}>{strength}</li>
                                        ))}
                                    </ul>
                                    <h4 className="text-lg font-semibold mb-2 text-gray-300">Weaknesses</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-100">
                                        {resumeFeedback.structure_organization.weaknesses.map((weakness, index) => (
                                            <li key={index}>{weakness}</li>
                                        ))}
                                    </ul>
                                    <h4 className="text-lg font-semibold mb-2 text-gray-300">Suggestions</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-100">
                                        {resumeFeedback.structure_organization.suggestions.map((suggestion, index) => (
                                            <li key={index}>{suggestion}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-left">
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsAtsOpen(!isAtsOpen);
                                }}
                                className="flex flex-row items-center justify-start space-x-4 p-2"
                            >
                                <svg 
                                    className={`w-5 h-5 transform transition-transform ${!isAtsOpen ? 'rotate-180' : ''}`}
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                <div
                                    className={`flex items-center justify-center w-12 h-12 rounded-full ${
                                        resumeFeedback.ats_readability.score >= 8
                                            ? "bg-green-500"
                                            : resumeFeedback.ats_readability.score >= 5
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                    }`}
                                >
                                    <span className="text-lg font-bold">{resumeFeedback.ats_readability.score}</span>
                                </div>
                                <h4 className="text-lg font-bold text-left w-96 text-gray-300">ATS Readability</h4>
                            </button>
                            <div 
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    isAtsOpen ? 'max-h-96' : 'max-h-0'
                                }`}
                            >
                                <hr className="border border-gray-700 mx-4 rounded-full" />
                                <div className="p-2">
                                    <h4 className="text-lg font-semibold mb-2 text-gray-300">Strengths</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-100">
                                        {resumeFeedback.ats_readability.strengths.map((strength, index) => (
                                            <li key={index}>{strength}</li>
                                        ))}
                                    </ul>
                                    <h4 className="text-lg font-semibold mb-2 text-gray-300">Weaknesses</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-100">
                                        {resumeFeedback.ats_readability.weaknesses.map((weakness, index) => (
                                            <li key={index}>{weakness}</li>
                                        ))}
                                    </ul>
                                    <h4 className="text-lg font-semibold mb-2 text-gray-300">Suggestions</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-100">
                                        {resumeFeedback.ats_readability.suggestions.map((suggestion, index) => (
                                            <li key={index}>{suggestion}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Upload;