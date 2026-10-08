import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice.js'

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes)
  const dispatch = useDispatch()

  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId))
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-5xl mx-auto px-4 pt-8">

        {/* Search Bar */}
        <input
          type="search"
          placeholder="Search your snippets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            w-full
            bg-slate-900
            text-white
            placeholder-gray-500
            border border-gray-700
            rounded-md
            px-4 py-3
            outline-none
            focus:border-blue-500
          "
        />

        {/* Heading */}
        <h1 className="text-3xl font-bold mt-8 mb-5">
          All Snippets
        </h1>

        {/* Paste List */}
        <div className="flex flex-col gap-4">

          {
            filteredData.length > 0 ? (

              filteredData.map((paste) => {

                return (

                  <div
                    key={paste._id}
                    className="
                      bg-slate-900
                      border border-gray-700
                      rounded-lg
                      p-5
                      hover:border-gray-600
                      transition
                    "
                  >

                    {/* Top Section */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-5">

                      {/* Paste Information */}
                      <div className="flex-1 min-w-0">

                        <h2 className="text-2xl font-bold mb-2">
                          {paste.title}
                        </h2>

                        <p className="text-gray-400 break-words">
                          {paste.content}
                        </p>

                      </div>


                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2 md:self-start">

                        <a
                          href={`/?pasteId=${paste?._id}`}
                          className="
                            px-4 py-2
                            rounded-md
                            border border-gray-600
                            hover:bg-gray-800
                            transition
                          "
                        >
                          Edit
                        </a>

                        <a
                          href={`/pastes/${paste?._id}`}
                          className="
                            px-4 py-2
                            rounded-md
                            border border-gray-600
                            hover:bg-gray-800
                            transition
                          "
                        >
                          View
                        </a>

                        <button
                          onClick={() => handleDelete(paste?._id)}
                          className="
                            px-4 py-2
                            rounded-md
                            border border-red-500
                            text-red-400
                            hover:bg-red-500
                            hover:text-white
                            transition
                          "
                        >
                          Delete
                        </button>

                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(paste?.content)
                            toast.success("Copied to clipboard")
                          }}
                          className="
                            px-4 py-2
                            rounded-md
                            border border-gray-600
                            hover:bg-gray-800
                            transition
                          "
                        >
                          Copy
                        </button>

                        <button
                          onClick={() => {
                            navigator.share({
                              title: paste.title,
                              text: paste.content
                            })
                          }}
                          className="
                            px-4 py-2
                            rounded-md
                            border border-gray-600
                            hover:bg-gray-800
                            transition
                          "
                        >
                          Share
                        </button>

                      </div>

                    </div>


                    {/* Date */}
                    <div className="mt-5 text-sm text-gray-500">
                      Created: {new Date(paste.createdAt).toLocaleString()}
                    </div>

                  </div>

                )

              })

            ) : (

              <div className="text-center text-gray-500 py-10">
                No pastes found
              </div>

            )
          }

        </div>

      </div>

    </div>
  )
}

export default Paste