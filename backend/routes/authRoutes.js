const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();
const {createSession}=require("../controllers/sessionController");
// Declare variable to store last uploaded image URL
let lastImageUrl = null;

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.post('/create',createSession);

// Upload image to Cloudinary
router.post("/upload-image", upload.single("image"), async (req, res) => {
    try {
        console.log("Uploaded file:", req.file);

        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const imageUrl = req.file.path;
        lastImageUrl = imageUrl; // Save it for later GET access

        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error("Upload Error:", JSON.stringify(error, null, 2));
        return res.status(500).json({
            message: "Image upload failed",
            error: error.message || error,
        });
    }
});

// Get the last uploaded image
router.get("/get-image", (req, res) => {
    if (!lastImageUrl) {
        return res.status(404).json({ message: "No image yet" });
    }
    res.status(200).json({ imageUrl: lastImageUrl });
});

module.exports = router;
