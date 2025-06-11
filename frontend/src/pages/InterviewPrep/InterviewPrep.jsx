import QuestionCard from "../../components/Cards/QuestionCard/QuestionCard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-hot-toast";
import React from 'react';
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import RoleInfoHeader from "../../components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
const InterviewPrep = () => {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const generateConceptExplanation = async (question) => {};

  const toogleQuestionPinStatus = async (questionId) => {};

  const uploadMoreQuestions = async () => {};

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, []);

    return (
    <div>
      <DashboardLayout>
        <RoleInfoHeader
          role={sessionData?.role || ""}
          topicsToFocus={sessionData?.topicsToFocus || ""}
          experience={sessionData?.experience || "-"}
          questions={sessionData?.questions?.length || "-"}
          description={sessionData?.description || ""}
          lastUpdated={
            sessionData?.updatedAt
              ? moment(sessionData.updatedAt).format("Do MMM YYYY")
              : ""
          }
        />
<div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
  <h2 className="text-lg font-semibold color-black">Interview Q &A</h2>

  {/* Properly opened and wrapped */}
  <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
    <div
      className={`col-span-12 ${
        openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
      }`}
    >
      <AnimatePresence>
        {sessionData?.questions?.map((data, index) => {
          return (
            <motion.div
              key={data.id || index}
              initial={{ opacity: 0, scale: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.4,
                type: "spring",
                stiffness: 100,
                delay: index * 0.1,
                damping: 15,
              }}
              layout
              layoutId={`question-${data.id || index}`}
            >
              <>
                <QuestionCard
                  question={data?.question}
                  answer={data?.answer}
                  onLearnMore={() =>
                    generateConceptExplanation(data.question)
                  }
                  isPinned={data?.isPinned}
                  onTooglePin={() => toogleQuestionPinStatus(data._id)}
                />
              </>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  </div> 
</div>


 </DashboardLayout>
    </div>
  );
};

export default InterviewPrep;