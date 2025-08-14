import React, { useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const Chat = ({ fileId }) => {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);

    const fetchChatHistory = useCallback(async () => {
        try {
            const response = await axios.get(`/api/chat/start-chat?file_id=${fileId}`);
            if (response.data === 0) {
                setMessages((prev) => [...prev, { type: "bot", text: "Hello! How can I help you today?" }]);
            }
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching chat history:", error);
        }
    }, [fileId]);

    useEffect(() => {
        if (!fileId) return;
        fetchChatHistory();

    }, [fileId, fetchChatHistory]);

    const handleChat = async () => {
        if (!question.trim()) return;

        setMessages((prev) => [...prev, { type: "user", text: question }]);

        const formData = new FormData();
        formData.append("file_id", fileId);
        formData.append("message", question);

        try {
            const response = await axios.post("/api/chat", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            setMessages((prev) => [...prev, { type: "bot", text: response.data.response }]);
            setQuestion("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    return (
        <div className='sticky top-0 flex flex-col p-4 bg-gray-700 min-h-full shadow-md'>
            <h2 className='text-lg font-bold text-gray-200 flex-shrink-0 mb-2'>Chat with Your Document</h2>

            <div className='bg-gray-300 border p-2 rounded max-h-full min-h-0 overflow-y-auto'>
                <div className='overflow-y-auto' style={{ maxHeight: 'calc(70vh)' }}>
                    {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`p-2 my-1 rounded text-sm ${message.type === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'
                            }`}
                    >
                        {message.type === 'bot' ? (
                            <ReactMarkdown className="text-sm prose">{message.text}</ReactMarkdown>
                        ) : (
                            message.text
                        )}
                    </div>
                ))}
                </div>
            </div>
            <div className='flex flex-shrink-0 rounded p-1 mt-2'>
                <input
                    type='text'
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className='rounded border p-2 flex-1 text-gray-200'
                />
                <button
                    onClick={handleChat}
                    className='bg-blue-500 text-white p-1 px-4 ml-2 rounded'
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chat;