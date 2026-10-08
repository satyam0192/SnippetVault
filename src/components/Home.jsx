import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice.js';

const Home = () => {

  const [title, setTitle] = useState('');
  const [value, setValue] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();

  const allPastes = useSelector(
    (state) => state.paste.pastes
  );

  useEffect(() => {

    if (pasteId) {

      const paste = allPastes.find(
        (p) => p._id === pasteId
      );

      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }

    }

  }, [pasteId, allPastes]);


  function createPaste() {

    if (!title.trim() || !value.trim()) {
      toast.error("Title and content cannot be empty");
      return;
    }

    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {

      dispatch(updateToPastes(paste));

    } else {

      dispatch(addToPastes(paste));

    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }


  return (
<div className="min-h-screen dynamic-bg">
        <div className="max-w-5xl mx-auto px-4 pt-10">

        {/* Title + Button */}
        <div className="flex flex-col sm:flex-row gap-4">

          <input
            type="text"
            placeholder="Enter snippet title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
              flex-1
              bg-slate-900
              text-white
              placeholder-gray-500
              border border-gray-700
              rounded-md
              px-4 py-3
              text-lg
              outline-none
              focus:border-blue-500
            "
          />

          <button
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              rounded-md
              px-6 py-3
              transition
            "
            onClick={createPaste}
          >
            {pasteId
              ? "Update Snippet"
              : "Create Snippet"
            }
          </button>

        </div>


        {/* Content */}
        <div className="mt-6">

          <textarea
            value={value}
            placeholder="Write your snippet here..."
            onChange={(e) => setValue(e.target.value)}
            rows={20}
            className="
              w-full
              bg-slate-900
              text-white
              placeholder-gray-500
              border border-gray-700
              rounded-md
              p-4
              text-base
              resize-y
              outline-none
              focus:border-blue-500
            "
          />

        </div>

      </div>

    </div>
  );
};

export default Home;