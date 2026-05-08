const dotenv=require("dotenv")
dotenv.config();
const express=require("express")
const app=express();
const cors=require("cors")
const bcrypt=require("bcryptjs")
const authRoute=require('./src/routes/authRoute')
const port=process.env.PORT || 5000;
app.get("/",(req,res)=>{
   try {
     res.send("Phone pe")
   } catch (error) {
    console.log(error)
   }
})

app.use("/api/auth",authRoute);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
})