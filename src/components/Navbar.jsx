import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="w-full bg-slate-800">
      <div className="max-w-5xl mx-auto flex justify-between items-center py-3 px-4">

        <NavLink
          to="/"
          className="text-xl font-bold text-white"
        >
          SnippetVault
        </NavLink>

        <div className="flex gap-6">
          <NavLink
            to="/"
            className="text-white hover:text-blue-400"
          >
            Home
          </NavLink>

          <NavLink
            to="/pastes"
            className="text-white hover:text-blue-400"
          >
            Snippets
          </NavLink>
        </div>

      </div>
    </nav>
  )
}

export default Navbar