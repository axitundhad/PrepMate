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
      // You might want to display a toast error here
      toast.error("Failed to fetch session details.");
    }
  };

  const generateConceptExplanation = async (question) => {
    // Implement your logic to generate concept explanation
    console.log("Generating explanation for:", question);
    // For demonstration:
    setExplanation(`Explanation for: ${question}`);
    setOpenLearnMoreDrawer(true);
  };

  const toogleQuestionPinStatus = async (questionId) => {
    // Implement your logic to toggle pin status
    console.log("Toggling pin status for question:", questionId);
    // You'd typically make an API call here to update the pin status
    // and then update the sessionData state
    toast.success(`Question ${questionId} pin status toggled.`);
  };

  const uploadMoreQuestions = async () => {
    // Implement your logic to upload more questions
    console.log("Uploading more questions...");
    // This would likely involve an API call and updating sessionData
    toast.info("Attempting to upload more questions.");
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, [sessionId]); // Added sessionId to dependency array

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
              ? moment(sessionData.updatedAt).format("Do MMM YYYY") // Corrected this line
              : ""
          }
        />
        <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
          <h2 className="text-lg font-semibold color-black">Interview Q & A</h2>

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
                      initial={{ opacity: 0, scale: 0.95 }}
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
                      <QuestionCard
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() =>
                          generateConceptExplanation(data.question)
                        }
                        isPinned={data?.isPinned}
                        onTogglePin={() => toogleQuestionPinStatus(data._id)}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            {/* Conditional rendering for the Learn More drawer/sidebar */}
            {openLearnMoreDrawer && (
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="col-span-12 md:col-span-5 bg-white rounded-lg shadow-xl p-5 border border-gray-100/60"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Concept Explanation</h3>
                  <button
                    onClick={() => setOpenLearnMoreDrawer(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <LuListCollapse size={20} />
                  </button>
                </div>
                {isLoading ? (
                  <SpinnerLoader />
                ) : explanation ? (
                  <p className="text-gray-700">{explanation}</p>
                ) : (
                  <div className="flex items-center text-gray-500">
                    <LuCircleAlert className="mr-2" />
                    No explanation available.
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default InterviewPrep;