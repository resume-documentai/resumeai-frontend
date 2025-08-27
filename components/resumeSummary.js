import ResumeFeedback from "./feedback";


const ResumeSummary = ({
    selectedResumeTitle,
    resumeOverallScore,
    resumeText,
    resumeGeneralFeedback,
    resumeFeedback,
    isExtractedTextOpen,
    setExtractedTextOpen
}) => {
    return (
        <div className="h-full w-full">
            {/* Resume Title */}
            <div className="flex flex-row items-center justify-between px-4 py-2 mb-2 bg-gray-700 shadow-2xl ">
                {selectedResumeTitle && (
                    <h1 className="text-2xl font-bold text-gray-200">{selectedResumeTitle}</h1>
                )}
                {/* Resume Overall Score */}
                {resumeOverallScore && (
                    <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full ${
                            resumeOverallScore >= 8
                                ? "bg-green-500"
                                : resumeOverallScore >= 5
                                ? "bg-yellow-500"
                                : "bg-red-500"
                        }`}
                    >
                        <span className="text-lg font-bold">{resumeOverallScore}</span>
                    </div>
                )}
            </div>
            {/* Resume Text */}
            {resumeText ? (
                <div>
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            setExtractedTextOpen(!isExtractedTextOpen);
                        }}
                        className="flex items-center justify-left ml-2 w-full"
                    >
                        <svg 
                            className={`w-5 h-5 text-gray-200 transform transition-transform ${!isExtractedTextOpen ? 'rotate-180' : ''}`}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>                            
                        <span className="px-2 text-xl text-gray-200 text-left text-lrg font-bold mb-2 ">Extracted Text</span>
                    </button>
                    <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isExtractedTextOpen ? 'max-h-96' : 'max-h-0'
                        }`}
                    >
                        
                        <div className="rounded mx-4">
                            <div 
                                className="p-2 text-sm bg-gray-300 overflow-auto max-h-80 rounded whitespace-pre-wrap"
                                dangerouslySetInnerHTML={{ __html: resumeText }}
                            />
                        </div>
                    </div>
                    <hr className="border border-gray-700 mx-4 mb-2 rounded-full" />
                </div>
            ) : (
                <p className="text-center text-gray-500">Select a resume to view</p>
            )}
            {/* Resume General Feedback */}
            {resumeGeneralFeedback && (
                <div>
                    <span className="ml-7 px-2 text-xl text-gray-200 text-left text-lrg font-bold mb-2 "> General Feedback </span>
                    <div className="p-2 text-gray-200 mb-2 mx-4">
                        {resumeGeneralFeedback}
                    </div>
                    <hr className="border border-gray-700 mx-4 mb-2 rounded-full" />
                </div>
            )}
            {/* Resume Feedback */}
            <ResumeFeedback
                feedback={resumeFeedback}
                className=''
                titleClassName="ml-7 px-2 text-xl text-gray-200 text-left text-lrg font-bold mb-2 "
                bodyClassName="p-2 space-y-2"
                collapsible={false}
            />
        </div>
    );
};

export default ResumeSummary;