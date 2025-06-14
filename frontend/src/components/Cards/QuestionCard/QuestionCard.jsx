import React from "react";
import { useState, useEffect, useRef } from "react";
import { LuChevronDown, LuPin, LuSparkles, LuPinOff } from "react-icons/lu"; // Added LuPinOff
import AIResponsePreview from "../../AIResponsePreview";
import { API_PATHS } from "../../../utils/apiPaths";
import axiosInstance from "../../../utils/axiosInstance";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
  onNoteSaved,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const [note, setNote] = useState(question.note || "");
  const [isSaving, setIsSaving] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10); // Added a small padding
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNoteSave = async () => {
    try {
      setIsSaving(true);
      const res = await axiosInstance.put(
        API_PATHS.QUESTION.UPDATE_NOTE(question._id),
        {
          note,
        }
      );

      if (res.status !== 200) {
        throw new Error("Failed to save note");
      }

      onNoteSaved?.(); // 🔁 Trigger session re-fetch
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-100/70 border border-gray-100/60 group">
      <div className="flex items-start justify-between cursor-pointer">
        <div className="flex items-start gap-3.5">
          <span className="text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px]">
            Q
          </span>
          <h3
            className="text-xs md:text-[14px] font--medium text-gray-800 mr-0 md:mr-20"
            onClick={toggleExpand}
          >
            {question.question}
          </h3>
        </div>
        {question.note && (
            <p className="text-[12px] font-medium mt-2 ">
              📝 Note: {question.note}
            </p>
          )}
        <div className="flex items-center justify-end ml-4 relative">
          <div
            className={`flex ${
              isExpanded ? "md:flex" : "md:hidden group-hover:flex"
            }`}
          >
            <button
              className="flex items-center gap-2 text-xs text-indigo-800 font-medium bg-indigo-50 px-3 py-1 mr-2 rounded text-nowrap border border-indigo-50 hover:border-indigo-200 cursor-pointer"
              onClick={onTogglePin}
            >
              {isPinned ? (
                <LuPinOff className="text-xs" />
              ) : (
                <LuPin className="text-xs" />
              )}
            </button>
            <button
              className="flex items-center gap-2 text-xs text-cyan-800 font-medium bg-cyan-50 px-3 py-1 mr-2 rounded text-nowrap border-cyan-50 hover:border-cyan-200 cursor-pointer"
              onClick={() => {
                setIsExpanded(true);
                onLearnMore();
              }}
            >
              <LuSparkles />
              <span className="hidden md:block">Learn More</span>
            </button>
          </div>{" "}
          {/* Closing div for flex utilities */}
          <button
            className="text-gray-400 hover:text-gray-500 cursor-pointer"
            onClick={toggleExpand}
          >
            <LuChevronDown
              size={20}
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div
          ref={contentRef}
          className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg"
        >
          <AIResponsePreview content={answer} />
          {question.note && (
            <p className="text-[12px] font-semibold mt-2 truncate">
              📝 Note: {question.note}
            </p>
          )}

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Notes:
            </label>
            <textarea
              className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 resize-none"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your notes here..."
            />
            <button
              onClick={handleNoteSave}
              disabled={isSaving}
              className="btn-primary"
            >
              {isSaving ? "Saving..." : "Save Note"}
            </button>
          </div>
        </div>
      </div>
    </div> // Closing div for the main QuestionCard container
  );
};

export default QuestionCard;
