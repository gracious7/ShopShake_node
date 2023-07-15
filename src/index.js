const express=require("express")
const cors=require('cors');

const app=express();

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    return res.status(200).send({message:"welcome to ecommerce api"})
})

const authRouter=require("./routes/auth.routes")
app.use("/auth",authRouter)

const userRouter=require("./routes/user.routes");
app.use("/api/users",userRouter)


module.exports={app}