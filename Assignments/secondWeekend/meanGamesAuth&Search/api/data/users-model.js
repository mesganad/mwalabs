const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String
    },
    password:{
        type:String,
        required:true
    }
});
mongoose.model("User",userSchema,"users"); //we can use default collection "users" of meanGames db as well.