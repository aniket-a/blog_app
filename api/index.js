const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const multer = require("multer")
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

const connectDB = require("./dbconfig/db")
const authRouter = require("./routes/auth.js")
const userRouter = require("./routes/UserRouter.js");
const postRouter = require("./routes/PostRouter.js")
const catRouter = require("./routes/CategoryRouter.js")


dotenv.config()
const port = 4500;

// User Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/cat", catRouter);
app.use("/images", express.static("images"));



// Post Routes
app.use("/api/posts", postRouter);


 
const storage = multer.diskStorage({
  destination:  (req, file, cb)=> {
    cb(null, "./images");
  },
  filename:  (req, file, cb)=> {
    cb(null, req.body.name)
  },
});

const upload = multer({storage:storage})

app.post("/api/upload", upload.single("file"), (req, res)=>{
    res.status(200).json("File has been uploaded!")
})




app.listen(port, ()=>{
    connectDB()
    console.log(`server running fine ${port}!` .bgCyan.white);
})