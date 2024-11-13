import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { LuListTodo } from "react-icons/lu"

const Header = () => {
    return (
        <div>
            <header>
                <div className="w-full bg-gray-800 flex justify-between items-center p-4 shadow-lg">
                    {/* Logo and Title */}
                    <div className="text-white text-2xl flex items-center gap-2 font-semibold">
                        <span className="text-violet-500"><LuListTodo /></span>
                        Todo App
                    </div>

                    {/* GitHub Icon Link */}
                    <div className="text-white text-2xl">
                        <a
                            href="https://github.com/mmtq"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-violet-500 transition-colors"
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </a>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
