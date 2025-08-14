// components/ResponsiveSidebars.jsx
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Chat from "./chat";

function ResumesList({ resumes, selectedResume, handleSelectResume }) {
  return (
    <div className="p-4">
      {/* <div className="fixed h-full w-1/4 bg-gray-700 p-4 shadow-md">
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
      </div> */}
    </div>
  );
}

function ChatPane({ fileId }) {
  return <Chat fileId={fileId} />;
}

export default function ResponsiveSidebars({
  Left = ResumesList,
  Right = ChatPane,
  resumes,
  selectedResume,
  handleSelectResume,
}) {
  const [active, setActive] = useState("resumes"); // 'resumes' | 'chat'

  const Selected = useMemo(() => (active === "resumes" ? Left : Right), [active, Left, Right]);

  // Animation origin depends on which tab is opening
  const origin = active === "resumes" ? "left" : "right";

  return (
    <div className="pt-16 w-full min-h-screen bg-gray-100">
      {/* Desktop / tablet: two sidebars */}
      <div className="hidden md:grid md:grid-cols-[280px_1fr_360px] gap-4 px-4 py-4">
        {/* Left sidebar */}
        <aside className="bg-gray-700 text-gray-100 shadow">
          <div className="px-4 py-3 font-semibold border-b border-gray-600">Resumes</div>
          <Left resumes={resumes} selectedResume={selectedResume} handleSelectResume={handleSelectResume} />
        </aside>

        {/* Main content placeholder */}
        <section className="rounded-2xl bg-white shadow min-h-[400px]">
          {/* Put your main page body here */}
        </section>

        {/* Right sidebar */}
        <aside className="bg-gray-700 text-gray-100 shadow">
          <div className="px-4 py-3 font-semibold border-b border-gray-600">Chat</div>
          <Right fileId={selectedResume?.file_id} />
        </aside>
      </div>

      {/* Mobile: tabs + animated panel */}
      <div className="md:hidden px-3 py-3 space-y-3">
        {/* Tabs row under the fixed header */}
        <div
          className="flex w-full rounded-xl bg-gray-200 p-1 text-sm font-medium"
          role="tablist"
          aria-label="Resumes and Chat"
        >
          <button
            role="tab"
            aria-selected={active === "resumes"}
            onClick={() => setActive("resumes")}
            className={`flex-1 rounded-lg px-3 py-2 transition ${
              active === "resumes"
                ? "bg-white shadow text-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Resumes
          </button>
          <div className="self-center text-gray-500 px-1">|</div>
          <button
            role="tab"
            aria-selected={active === "chat"}
            onClick={() => setActive("chat")}
            className={`flex-1 rounded-lg px-3 py-2 transition ${
              active === "chat"
                ? "bg-white shadow text-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Chat
          </button>
        </div>

        {/* Animated content area */}
        <div className="rounded-2xl bg-white shadow overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ scaleX: 0.001, opacity: 0.0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0.001, opacity: 0.0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ transformOrigin: origin }}
            >
              <Selected />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}