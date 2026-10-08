import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ViewPaste = () => {

  const { id } = useParams()

  const allPastes = useSelector(
    (state) => state.paste.pastes
  )

  const paste = allPastes.find(
    (p) => p._id === id
  )

  console.log("URL ID:", id)
  console.log("Found Paste:", paste)

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-5xl mx-auto px-4 pt-10">

        {/* Title */}
        <div className="mb-6">

          <input
            type="text"
            value={paste?.title || ""}
            disabled
            className="
              w-full
              bg-slate-900
              text-white
              border border-gray-700
              rounded-md
              px-4 py-3
              text-xl
              font-semibold
              outline-none
            "
          />

        </div>

        {/* Content */}
        <div>

          <textarea
            value={paste?.content || ""}
            disabled
            rows={20}
            className="
              w-full
              bg-slate-900
              text-gray-300
              border border-gray-700
              rounded-md
              p-4
              text-base
              outline-none
              resize-y
            "
          />

        </div>

        {/* Created At */}
        <div className="mt-4 text-sm text-gray-500">
          Created: {
            paste?.createdAt
              ? new Date(paste.createdAt).toLocaleString()
              : ""
          }
        </div>

      </div>

    </div>
  )
}

export default ViewPaste