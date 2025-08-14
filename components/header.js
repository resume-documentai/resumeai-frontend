"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header({ user, logout }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-gray-600 shadow-md h-16">
      <div className="mx-auto flex items-center justify-between px-4 h-full">
        {/* Brand (responsive label) */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-200">
          <Link href="/" className="hover:text-blue-200">
            <span className="md:hidden">r.AI</span>
            <span className="hidden md:inline">Resume AI</span>
          </Link>
        </h1>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6">
            <li>
              <Link href="/" className="text-gray-200 hover:text-blue-200">Home</Link>
            </li>
            <li>
              <Link href="/upload" className="text-gray-200 hover:text-blue-200">Upload</Link>
            </li>
            <li className="border-l border-gray-300 h-6" />
            {user ? (
              <>
                <li>
                  <Link href="/resume_list" className="text-gray-200 hover:text-blue-200">My Resumes</Link>
                </li>
                <li className="text-gray-200">Welcome, <strong>{user}</strong></li>
                <li>
                  <button
                    onClick={logout}
                    className="text-red-500 hover:text-red-700 border border-red-500 px-3 py-1 rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login" className="text-gray-200 hover:text-blue-200">Login</Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile: hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded hover:bg-gray-500 focus:outline-none"
        >
          <svg
            className="h-6 w-6 text-gray-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div
          className="md:hidden absolute right-0 top-16 w-64 rounded-bl-2xl bg-gray-700 shadow-xl border-t border-gray-500"
          role="menu"
        >
          <ul className="flex flex-col py-2">
            <li>
              <Link
                href="/"
                className="block px-4 py-2 text-gray-200 hover:bg-gray-600"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/upload"
                className="block px-4 py-2 text-gray-200 hover:bg-gray-600"
                onClick={() => setOpen(false)}
              >
                Upload
              </Link>
            </li>
            <li className="my-2 border-t border-gray-500" />
            {user ? (
              <>
                <li>
                  <Link
                    href="/resume_list"
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-600"
                    onClick={() => setOpen(false)}
                  >
                    My Resumes
                  </Link>
                </li>
                <li className="px-4 py-2 text-gray-300">
                  Welcome, <strong>{user}</strong>
                </li>
                <li className="px-4 py-2">
                  <button
                    onClick={() => {
                      setOpen(false);
                      if (logout) logout();
                    }}
                    className="w-full text-left text-red-500 hover:text-red-700 border border-red-500 px-3 py-1 rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="block px-4 py-2 text-gray-200 hover:bg-gray-600"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}