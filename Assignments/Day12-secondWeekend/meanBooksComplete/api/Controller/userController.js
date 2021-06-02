const mongoose =require("mongoose");
const User=mongoose.model("User");
const bcrypt=require("bcrypt-nodejs");
const jwt=require("jsonwebtoken");

module.exports.register=function(req,res){
    console.log("Register User");
    if(req.body.username && req.body.password){
    const newUser={
    username:req.body.username,
    name:req.body.name,
    password:bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
    }

    User.create(newUser,function(err,user){
        const response={
            status:201,
            message:user
        }

        if(err){
            response.status=400;
            response.message=err;
        }
        else{
            console.log("User created", user);
        }
        res.status(response.status).json(response.message);
    });
}
else{
    res.status(404).json({"message" : "Missing required fields"});
}
}


module.exports.login=function(req,res){
    console.log("Authenticate User");
    const authUser={
    username:req.body.username,
    password:req.body.password
    }

    
    User.findOne({username:authUser.username}).exec(function(err,user){
        
        const response={
            status:201,
            message:user
            
        }

        if(err){
            response.status=400;
            response.message=err;
        }
        else if(!user){
            response.status=404; //what you're looking for doesn't exist
            response.message=({"message":"Unauthorized user"});
        }
        else{
            console.log("inside findone");
            if(user && bcrypt.compareSync(authUser.password,user.password)){
                let token = jwt.sign({name: user.name}, "cs572", {expiresIn: 3600}); //Token expires after one hour
                
                res.status(200).json({success: true, token: token});
                return;
            }
            else{
                console.log("Unauthorized user");
                response.status=401; //password is wrong
                response.message=({"message":"Unauthorized user"});
            }
        }
        res.status(response.status).json(response.message);
        return;


    });
}
    
    
    module.exports.authenticate=function(req,res,next){
        const headerExists=req.headers.authorization;
        console.log("headerValue "+headerExists);
            const response={
                status:403,
                message:""
            }
            if(headerExists){
                const token=req.headers.authorization.split(" ")[1];
                jwt.verify(token, "cs572",function(err,decoded){
                    if(err){
                        console.log(err);
                        res.status(401).json({message:"Unauthorized"});
                    }
                    else{
                        req.user=decoded.user
                        next();
                    }
        
                });
        
        
            }
            else{
                res.status(403).json({message:"No token providing"});
                return;
            }
        }
        

