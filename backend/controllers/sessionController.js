const Session = require("../models/Session");
const Question = require("../models/Question");

exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } =
      req.body;
    const userId = req.user._id;

    console.log("Session creation payload:", req.body);

    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }
    console.log("UserId:", req.user._id);

    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      })
    );

    console.log("Final session object", {
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
      questions: questionDocs,
    });
    session.questions = questionDocs;

    await session.save();

    console.log("Session Created");
    res.status(201).json({ success: true, session });
  } catch (error) {
    console.error("Error creating session", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// exports.createSession = async (req, res) => {
//     try {
//         const { role, experience, topicsToFocus, description, questions } = req.body;
//         console.log("Request body:", req.body);  // Check the body

//         // const userId = "684474ba4d30f823ec777608";
//         // const userId = req.user ? req.user._id : null;  // In case there's no protect middleware
//         if (!userId) {
//             console.log("User ID not found");
//             return res.status(400).json({ success: false, message: "User not authenticated" });
//         }

//         const session = await Session.create({
//             user: userId,
//             role,
//             experience,
//             topicsToFocus,
//             description,
//         });

//         const questionDocs = await Promise.all(
//             questions.map(async (q) => {
//                 const question = await Question.create({
//                     session: session._id,
//                     question: q.question,
//                     answer: q.answer,
//                 });
//                 return question._id;
//             })
//         );

//         session.questions = questionDocs;
//         await session.save();

//         res.status(201).json({ success: true, session });

//     } catch (error) {
//         console.log("Error in createSession:", error); // Detailed error log
//         res.status(500).json({ success: false, message: "Server error", error: error.message });
//     }
// };

// ✅ Get My Sessions (Fix: missing `.` before populate)
exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("questions");

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🚧 To be implemented later
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: -1 } },
      })
      .exec();

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    //Check if the logged-in user owns this session
    if (session.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this session" });
    }

    //First delete all questions linked to this session
    await Question.deleteMany({ session: session._id });

    //Then, delete the session
    await session.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
