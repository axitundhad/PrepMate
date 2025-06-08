require(`dotenv`).config();
const express=require("express");
const cors=require("cors");
const path=require("path");
const authRoutes=require('./routes/authRoutes');
const sessionRoutes=require('./routes/sessionRoutes');
const questionRoutes=require('./routes/questionRoutes');
const connectDB=require("./config/db")
const app=express();

app.use(
    cors({
        origin:"*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization",]
    })
);

connectDB()
// Middleware
app.use(express.json());
// Routes
app.use('/api/auth',authRoutes);
app.use('/api/sessions', sessionRoutes );

// app.use('/api/questions',questionRoutes);

// app.use('api/ai/genrate-questions',protect,genrateInterviewQuestions);
// app.use("/api/ai/genrate-explanation",protect,genrateConceptExplanation);

// app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}));


const PORT=process.env.PORT||8000;
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))