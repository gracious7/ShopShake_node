const { default: mongoose } = require("mongoose")

const connectDb=()=>{
    return mongoose.connect("")
}

module.exports={connectDb}