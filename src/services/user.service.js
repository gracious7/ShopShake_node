const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../modals/user.moda');
const jwtProvider=require("../config/jwtProvider")

const createUser = async (userData)=>{
    try {

        const {firstName,lastName,email,password}=userData;

        const isUserExist=await User.find({email});

        if(isUserExist){
            throw new Error("user already exist with email : ",email)
        }

        password=await bcrypt.hash(password,8);
    
        const user=await User.create({firstName,lastName,email,password})
    
        return user;
        
    } catch (error) {
        console.log("error - ",error.message)
        throw new Error(error.message)
    }

}

const findUserById=async(userId)=>{
    try {
        const user = await User.findById(userId);
        if(!user){
            throw new Error("user not found with id : ",userId)
        }
        return user;
    } catch (error) {
        console.log("error :- ",error)
        throw new Error(error.message)
    }
}

const getUserByEmail=async(email)=>{
    try {

        const user=await User.find({email});

        if(!user){
            throw new Error("user found with email : ",email)
        }

        return user;
        
    } catch (error) {
        console.log("error - ",error.message)
        throw new Error(error.message)
    }
}

const getUserProfileByToken=async(token)=>{
    try {

        const userId=jwtProvider.getUserIdFromToken(token)

        const user=findUserById(userId)
        if(!user){
            throw new Error("user not exist with id : ",userId)
        }
        return user;
    } catch (error) {
        console.log("error - ",error.message)
        throw new Error(error.message)
    }
}

module.exports={
    createUser,
    findUserById,
    getUserProfileByToken,
    getUserByEmail
}