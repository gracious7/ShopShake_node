const userService=require("../services/user.service")
const jwtProvider=require("../config/jwtProvider")
const bcrypt=require("bcrypt")


const register=async(req,res)=>{

    try {
        const user=userService.createUser(req.body);
        const jwt=jwtProvider.generateToken(user._id);

        return res.status(200).send({jwt,message:"register success"})
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}
const login=async(req,res)=>{
    const {password,email}=req.body
    try {
        const user = await userService.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found With Email ', email});
        }

        const isPasswordValid=await bcrypt.compare(user.password,password)

        if(!isPasswordValid){
            return res.status(401).json({ message: 'Invalid password' });
        }

        const jwt=jwtProvider.generateToken(user._id);

        return res.status(200).send({jwt});

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}
module.exports={register,login}