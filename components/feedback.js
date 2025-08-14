import { useState } from 'react';

export default function ResumeFeedback({ feedback ,
    className = "flex flex-col w-full mt-4 bg-gray-600 rounded-xl",
    titleClassName = "text-2xl font-bold p-4 shadow-md text-gray-400 bg-gray-700 rounded-t-lg",
    bodyClassName = "p-2 space-y-2",
    collapsible = false
}) {
    const [isGrammarOpen, setIsGrammarOpen] = useState(false);
    const [isClarityOpen, setIsClarityOpen] = useState(false);
    const [isImpactOpen, setIsImpactOpen] = useState(false);
    const [isStructureOpen, setIsStructureOpen] = useState(false);
    const [isAtsOpen, setIsAtsOpen] = useState(false);
    const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

    if (!feedback) return null;

    const renderFeedbackSection = (sectionKey, title, isOpen, setIsOpen) => {
        const section = feedback[sectionKey];
        if (!section) return null;

        const score = section.score;
        const scoreColor = score >= 8 ? "bg-green-500" : score >= 5 ? "bg-yellow-500" : "bg-red-500";

        return (
            <div key={sectionKey} className="flex flex-col">
                <button 
                    onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                    }}
                    className="flex flex-row items-center justify-start space-x-4 p-2 hover:bg-gray-700 transition-colors rounded"
                >
                    <svg 
                        className={`w-5 h-5 transform transition-transform ${!isOpen ? 'rotate-180' : ''} text-gray-400`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${scoreColor}`}>
                        <span className="text-lg font-bold">{score}</span>
                    </div>
                    <h4 className="text-lg font-bold text-left text-gray-300">{title}</h4>
                </button>
                
                <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
                >
                    <hr className="border border-gray-700 mx-4" />
                    <div className="p-4 space-y-4">
                        {section.strengths?.length > 0 && (
                            <div>
                                <h4 className="text-lg font-semibold mb-2 text-gray-300">Strengths</h4>
                                <ul className="list-disc list-inside space-y-1 text-gray-100">
                                    {section.strengths.map((item, idx) => (
                                        <li key={`${sectionKey}-strength-${idx}`}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {section.weaknesses?.length > 0 && (
                            <div>
                                <h4 className="text-lg font-semibold mb-2 text-gray-300">Weaknesses</h4>
                                <ul className="list-disc list-inside space-y-1 text-gray-100">
                                    {section.weaknesses.map((item, idx) => (
                                        <li key={`${sectionKey}-weakness-${idx}`}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {section.suggestions?.length > 0 && (
                            <div>
                                <h4 className="text-lg font-semibold mb-2 text-gray-300">Suggestions</h4>
                                <ul className="list-disc list-inside space-y-1 text-gray-100">
                                    {section.suggestions.map((item, idx) => (
                                        <li key={`${sectionKey}-suggestion-${idx}`}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={className}>
            {collapsible ? (
                <>
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            setIsCollapsibleOpen(!isCollapsibleOpen);
                        }}
                        className="flex flex-row items-center justify-left w-full"
                    >
                        <svg 
                            className={`w-5 h-5 text-gray-200 transform transition-transform ${!isCollapsibleOpen ? 'rotate-180' : ''}`}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <h1 className={titleClassName}>Feedback</h1>
                    </button>
                    <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isCollapsibleOpen ? 'max-h-96' : 'max-h-0'
                        }`}
                    >
                        <div className={bodyClassName}>
                            {renderFeedbackSection('grammar_spelling', 'Grammar & Spelling', isGrammarOpen, setIsGrammarOpen)}
                            {renderFeedbackSection('clarity_conciseness', 'Clarity & Conciseness', isClarityOpen, setIsClarityOpen)}
                            {renderFeedbackSection('impact_accomplishments', 'Impact & Accomplishments', isImpactOpen, setIsImpactOpen)}
                            {renderFeedbackSection('structure_organization', 'Structure & Organization', isStructureOpen, setIsStructureOpen)}
                            {renderFeedbackSection('ats_readability', 'ATS Readability', isAtsOpen, setIsAtsOpen)}
                        </div>
                    </div>
                    <hr className="border border-gray-700 mx-4 mb-2 rounded-full" />
                </>
            ) : (
                <>
                    <h1 className={titleClassName}>Feedback</h1>
                    <div className={bodyClassName}>
                        {renderFeedbackSection('grammar_spelling', 'Grammar & Spelling', isGrammarOpen, setIsGrammarOpen)}
                        {renderFeedbackSection('clarity_conciseness', 'Clarity & Conciseness', isClarityOpen, setIsClarityOpen)}
                        {renderFeedbackSection('impact_accomplishments', 'Impact & Accomplishments', isImpactOpen, setIsImpactOpen)}
                        {renderFeedbackSection('structure_organization', 'Structure & Organization', isStructureOpen, setIsStructureOpen)}
                        {renderFeedbackSection('ats_readability', 'ATS Readability', isAtsOpen, setIsAtsOpen)}
                    </div>
                </>
            )}
        </div>
    );
}


// {resumeFeedback && (
//     <div className="flex flex-col w-full rounded-xl  mt-4 rounded-lg bg-gray-600">
//         <h1 className="text-2xl font-bold p-4 shadow-md text-gray-400 bg-gray-700 rounded-t-lg">Feedback</h1>

//         <div className="flex flex-col justify-left">
//             <button 
//                 onClick={(e) => {
//                     e.preventDefault();
//                     setIsGrammarOpen(!isGrammarOpen);
//                 }}
//                 className="flex flex-row items-center justify-start space-x-4 p-2"
//             >
//                 <svg 
//                     className={`w-5 h-5 transform transition-transform ${!isGrammarOpen ? 'rotate-180' : ''}`}
//                     fill="none" 
//                     viewBox="0 0 24 24" 
//                     stroke="currentColor"
//                     >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//                 <div
//                     className={`flex items-center justify-center w-12 h-12 rounded-full ${
//                         resumeFeedback.grammar_spelling.score >= 8
//                             ? "bg-green-500"
//                             : resumeFeedback.grammar_spelling.score >= 5
//                             ? "bg-yellow-500"
//                             : "bg-red-500"
//                     }`}
//                 >
//                     <span className="text-lg font-bold">{resumeFeedback.grammar_spelling.score}</span>
//                 </div>
//                 <h4 className="text-lg font-bold text-left w-96 text-gray-300">Grammar & Spelling</h4>
//             </button>
//             <div 
//                 className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                     isGrammarOpen ? 'max-h-96' : 'max-h-0'
//                 }`}
//             >
//                 <hr className="border border-gray-700 mx-4 rounded-full" />
//                 <div className="p-2">
//                     <h4 className="text-lg font-semibold mb-2 text-gray-300">Strengths</h4>
//                     <ul className="list-disc list-inside space-y-1 text-gray-100">
//                         {resumeFeedback.grammar_spelling.strengths.map((strength, index) => (
//                             <li key={index}>{strength}</li>
//                         ))}
//                     </ul>
//                     <h4 className="text-lg font-semibold mb-2 text-gray-300">Weaknesses</h4>
//                     <ul className="list-disc list-inside space-y-1 text-gray-100">
//                         {resumeFeedback.grammar_spelling.weaknesses.map((weakness, index) => (
//                             <li key={index}>{weakness}</li>
//                         ))}
//                     </ul>
//                     <h4 className="text-lg font-semibold mb-2 text-gray-300">Suggestions</h4>
//                     <ul className="list-disc list-inside space-y-1 text-gray-100">
//                         {resumeFeedback.grammar_spelling.suggestions.map((suggestion, index) => (
//                             <li key={index}>{suggestion}</li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//         <div className="flex flex-col justify-left">
//             <button 
//                 onClick={(e) => {
//                     e.preventDefault();
//                     setIsClarityOpen(!isClarityOpen);
//                 }}
//                 className="flex flex-row items-center justify-start space-x-4 p-2"
//             >
//                 <svg 
//                     className={`w-5 h-5 transform transition-transform ${!isClarityOpen ? 'rotate-180' : ''}`}
//                     fill="none" 
//                     viewBox="0 0 24 24" 
//                     stroke="currentColor"
//                 >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//                 <div
//                     className={`flex items-center justify-center w-12 h-12 rounded-full ${
//                         resumeFeedback.clarity_conciseness.score >= 8
//                             ? "bg-green-500"
//                             : resumeFeedback.clarity_conciseness.score >= 5
//                             ? "bg-yellow-500"
//                             : "bg-red-500"
//                     }`}
//                 >
//                     <span className="text-lg font-bold">{resumeFeedback.clarity_conciseness.score}</span>
//                 </div>
//                 <h4 className="text-lg font-bold text-left w-96 text-gray-300">Clarity & Conciceness</h4>
//             </button>
//             <div 
//                 className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                     isClarityOpen ? 'max-h-96' : 'max-h-0'
//                 }`}
//             >
//                 <hr className="border border-gray-700 mx-4 rounded-full" />
//                 <div className="p-2">
//                     <h4 className="text-lg font-semibold mb-2 text-gray-300">Strengths</h4>
//                     <ul className="list-disc list-inside space-y-1 text-gray-100">
//                         {resumeFeedback.clarity_conciseness.strengths.map((strength, index) => (
//                             <li key={index}>{strength}</li>
//                         ))}
//                     </ul>
//                     <h4 className="text-lg font-semibold mb-2 text-gray-300">Weaknesses</h4>
//                     <ul className="list-disc list-inside space-y-1 text-gray-100">
//                         {resumeFeedback.clarity_conciseness.weaknesses.map((weakness, index) => (
//                             <li key={index}>{weakness}</li>
//                         ))}
//                     </ul>
//                     <h4 className="text-lg font-semibold mb-2 text-gray-300">Suggestions</h4>
//                     <ul className="list-disc list-inside space-y-1 text-gray-100">
//                         {resumeFeedback.clarity_conciseness.suggestions.map((suggestion, index) => (
//                             <li key={index}>{suggestion}</li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//         <div className="flex flex-col justify-left">
//             <button 
//                 onClick={(e) => {
//                     e.preventDefault();
//                     setIsImpactOpen(!isImpactOpen);
//                 }}
//                 className="flex flex-row items-center justify-start space-x-4 p-2"
//                 >
//                 <svg 
//                     className={`w-5 h-5 transform transition-transform ${!isImpactOpen ? 'rotate-180' : ''}`}
//                     fill="none" 
//                     viewBox="0 0 24 24" 
//                     stroke="currentColor"
//                 >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//                 <div
//                     className={`flex items-center justify-center w-12 h-12 rounded-full ${
//                         resumeFeedback.impact_accomplishments.score >= 8
//                             ? "bg-green-500"
//                             : resumeFeedback.impact_accomplishments.score >= 5
//                             ? "bg-yellow-500"
//                             : "bg-red-500"
//                     }`}
//                 >
//                     <span className="text-lg font-bold">{resumeFeedback.impact_accomplishments.score}</span>
//                 </div>
//                 <h4 className="text-lg font-bold text-left w-96 text-gray-300">Impact & Accomplishments</h4>
//             </button>
//             <div 
//                 className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                     isImpactOpen ? 'max-h-96' : 'max-h-0'
//                 }`}
//             >
//                 <hr className="border border-gray-700 mx-4 rounded-full" />
//                 <div className="p-2">
//                     <h4 className="text-lg font-semibold mb-2 text-gray-300">Strengths</h4>
//                     <ul className="list-disc list-inside space-y-1 text-gray-100">
//                         {resumeFeedback.impact_accomplishments.strengths.map((strength, index) => (
//                             <li key={index}>{strength}</li>
//                         ))}
//                     </ul>
//                     <h4 className="text-lg font-semibold mb-2 text-gray-300">Weaknesses</h4>
//                     <ul className="list-disc list-inside space-y-1 text-gray-100">
//                         {resumeFeedback.impact_accomplishments.weaknesses.map((weakness, index) => (
//                             <li key={index}>{weakness}</li>
//                         ))}
//                     </ul>
//                     <h4 className="text-lg font-semibold mb-2 text-gray-300">Suggestions</h4>
//                     <ul className="list-disc list-inside space-y-1 text-gray-100">
//                         {resumeFeedback.impact_accomplishments.suggestions.map((suggestion, index) => (
//                             <li key={index}>{suggestion}</li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//         <div className="flex flex-col justify-left">
//             <button 
//                 onClick={(e) => {
//                     e.preventDefault();
//                     setIsStructureOpen(!isStructureOpen);
//                 }}
//                 className="flex flex-row items-center justify-start space-x-4 p-2"
//             >
//                 <svg 
//                     className={`w-5 h-5 transform transition-transform ${!isStructureOpen ? 'rotate-180' : ''}`}
//                     fill="none" 
//                     viewBox="0 0 24 24" 
//                     stroke="currentColor"
//                 >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//                 <div
//                     className={`flex items-center justify-center w-12 h-12 rounded-full ${
//                         resumeFeedback.structure_organization.score >= 8
//                             ? "bg-green-500"
//                             : resumeFeedback.structure_organization.score >= 5
//                             ? "bg-yellow-500"
//                             : "bg-red-500"
//                     }`}
//                 >
//                     <span className="text-lg font-bold">{resumeFeedback.structure_organization.score}</span>
//                 </div>
//                 <h4 className="text-lg font-bold text-left w-96 text-gray-300">Structure & Organization</h4>
//             </button>
//             <div 
//                 className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                     isStructureOpen ? 'max-h-96' : 'max-h-0'
//                 }`}
//             >
//                 <hr className="border border-gray-700 mx-4 rounded-full" />
//                 <div className="p-2">
//                     <h4 className="text-lg font-semibold mb-2 text-gray-300">Strengths</h4>
//                     <ul className="list-disc list-inside space-y-1 text-gray-100">
//                         {resumeFeedback.structure_organization.strengths.map((strength, index) => (
//                             <li key={index}>{strength}</li>
//                         ))}
//                     </ul>
//                     <h4 className="text-lg font-semibold mb-2 text-gray-300">Weaknesses</h4>
//                     <ul className="list-disc list-inside space-y-1 text-gray-100">
//                         {resumeFeedback.structure_organization.weaknesses.map((weakness, index) => (
//                             <li key={index}>{weakness}</li>
//                         ))}
//                     </ul>
//                     <h4 className="text-lg font-semibold mb-2 text-gray-300">Suggestions</h4>
//                     <ul className="list-disc list-inside space-y-1 text-gray-100">
//                         {resumeFeedback.structure_organization.suggestions.map((suggestion, index) => (
//                             <li key={index}>{suggestion}</li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//         <div className="flex flex-col justify-left">
//             <button 
//                 onClick={(e) => {
//                     e.preventDefault();
//                     setIsAtsOpen(!isAtsOpen);
//                 }}
//                 className="flex flex-row items-center justify-start space-x-4 p-2"
//             >
//                 <svg 
//                     className={`w-5 h-5 transform transition-transform ${!isAtsOpen ? 'rotate-180' : ''}`}
//                     fill="none" 
//                     viewBox="0 0 24 24" 
//                     stroke="currentColor"
//                 >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//                 <div
//                     className={`flex items-center justify-center w-12 h-12 rounded-full ${
//                         resumeFeedback.ats_readability.score >= 8
//                             ? "bg-green-500"
//                             : resumeFeedback.ats_readability.score >= 5
//                             ? "bg-yellow-500"
//                             : "bg-red-500"
//                     }`}
//                 >
//                     <span className="text-lg font-bold">{resumeFeedback.ats_readability.score}</span>
//                 </div>
//                 <h4 className="text-lg font-bold text-left w-96 text-gray-300">ATS Readability</h4>
//             </button>
//             <div 
//                 className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                     isAtsOpen ? 'max-h-96' : 'max-h-0'
//                 }`}
//             >
//                 <hr className="border border-gray-700 mx-4 rounded-full" />
//                 <div className="p-2">
//                     <h4 className="text-lg font-semibold mb-2 text-gray-300">Strengths</h4>
//                     <ul className="list-disc list-inside space-y-1 text-gray-100">
//                         {resumeFeedback.ats_readability.strengths.map((strength, index) => (
//                             <li key={index}>{strength}</li>
//                         ))}
//                     </ul>
//                     <h4 className="text-lg font-semibold mb-2 text-gray-300">Weaknesses</h4>
//                     <ul className="list-disc list-inside space-y-1 text-gray-100">
//                         {resumeFeedback.ats_readability.weaknesses.map((weakness, index) => (
//                             <li key={index}>{weakness}</li>
//                         ))}
//                     </ul>
//                     <h4 className="text-lg font-semibold mb-2 text-gray-300">Suggestions</h4>
//                     <ul className="list-disc list-inside space-y-1 text-gray-100">
//                         {resumeFeedback.ats_readability.suggestions.map((suggestion, index) => (
//                             <li key={index}>{suggestion}</li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>

//     </div>
// )}