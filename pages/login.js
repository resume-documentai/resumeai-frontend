import React, { useState } from 'react';
import Layout from '../components/layout';
import { login, register } from '../utils/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegister) {
                await register({ username, email, password });
                setMessage("Registration successful. Please log in.");
                setIsRegister(false);
            } else {
                const response = await login({ username_or_email: email, password });
                setMessage(`Welcome, ${response.user.username}!`);

                window.location.href = "/";
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.detail || "An error occurred.");
            } else {
                setMessage("An error occurred. Please try again: " + error.message);
            }
            
        }
    };

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center p-4" style={{minHeight: `calc(100vh - 56px - 128px)`}}>
                <div className="p-6 bg-gray-300 rounded-lg shadow-lg w-96 text-center">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">{isRegister ? "Register" : "Login"}</h2>
                    <hr className="border-gray-400"/>
                    <form className="mt-6" onSubmit={handleSubmit}>
                        {isRegister && (
                            <div className="mb-1 flex justify-between items-center">
                                <label className="w-24 text-left font-semibold text-gray-700">Username:</label>
                                <input
                                    type="text"
                                    className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 ml-4"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        <div className="mb-1 flex justify-between items-center">
                            <label className="w-24 text-left font-semibold text-gray-700">Email:</label>
                            <input
                                type="email"
                                className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 ml-4"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className=" flex justify-between items-center">
                            <label className="w-24 text-left font-semibold text-gray-700">Password:</label>
                            <input
                                type="password"
                                className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 ml-4"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button className="m-4 px-4 py-2 bg-blue-500 text-white rounded-full" type="submit">
                            {isRegister ? "Register" : "Login"}
                        </button>
                    </form>

                    <p className="text-gray-700">
                        {isRegister ? "Already have an account?" : "Don't have an account?"}
                        <button
                            className="text-blue-500 ml-2"
                            onClick={() => setIsRegister(!isRegister)}
                        >
                            {isRegister ? "Login" : "Register"}
                        </button>
                    </p>

                    {message && <p className="mt-4 text-red-500">{message}</p>}
                </div>
            </div>
        </Layout>
    );
};

export default Login;