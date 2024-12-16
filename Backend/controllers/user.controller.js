import User from '../models/user.models.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const registerUser = async(req, res)=>{
    try{
    const {userName, email, password} = req.body;
    
    if([userName, email, password].some((field)=>field?.trim==="")){
        return res.status(400).json({
            success : false,
            message : "All fields are required"
        })
    }

    const existedUser =await User.findOne({
        $or : [
            { email },
            { userName}
        ]
    })

    if(existedUser){
        return  res.status(400).json({
            success : false,
            message : "Username or Email already exists"
        })
    }

    const hashedPass =await bcrypt.hash(password, 10)

    const newUser =await User.create({
        userName,
        email,
        password : hashedPass
    })
    if(!newUser){
        return res.status(400).json({
            success : false,
            message : "Something went wrong while registering"
        })
    }

    return res.status(200).json({
        success : true,
        message : "Account created Successfully"
    })
}
catch(err){
    
    console.log(err);
    
    return res.status(500).json({
        success : false,
        message : "Internal server error"
    })
}
}


const loginUser = async(req,res)=>{
    try{

        const {email, password} = req.body;
        if(!email && !password){
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }

        const existedUser =await User.findOne({
            email
        })

        if(!existedUser){
            return res.status(400).json({
                success : false,
                message : "Email not found"
            })
        }

        const checkedPass = await bcrypt.compare(password,existedUser.password)
        if(!checkedPass){
            return res.status(400).json({
                success : false,
                message : "Invalid Credentials"
            })
        }

        const token = jwt.sign(
            {

            id : existedUser._id,
            email : existedUser.email,
             },
             
            process.env.JWT_SECRET
             ,
        {
            expiresIn : "1d"
        })

        const options = {
            httpOnly : true,
            secure : true
        }


        return res.status(200).cookie("token",token,options).json({
            success : true,
            message : "Login Successful"
        })

    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal Server error"
        })
    }
}

const checkCookie = async(req,res)=>{
    try{
        const token = req.cookies['token']
        console.log(token);
        
        if(token){
            return res.status(200).json({
                message : true
            })     
           }

           return res.status(200).json({
            message : false
           })
    }
    catch(err){
       // console.log(err);
        return res.status(500).json({
            success:false,
            message : "Internal server error"
        }
        )
        
    }
}

const logoutUser = async(req,res)=>{
    try{
        const options = {
            httpOnly : true,
            secure : true
        }
         return  res.clearCookie('token',options).json({
            message : "Logged out successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            message : "Internal Server error"
        })
    }
}

const getProfileData = async(req,res)=>{
    try{
        const {user} = req
       
        const loggedInUser = await User.findById(user._id).select('-password')
        console.log(loggedInUser);
        
        res.status(200).json({
            loggedInUser
        })
        
    }
    catch(err){
        return res.status(500).json({
            message : "Internal server error"
        })
    }
}

const changePassword = async(req,res)=>{
try{
    const {user} = req
    const {password,newPassword, confirmNewPassword} = req.body
    if(newPassword !== confirmNewPassword){
        return res.status(400).json({
            message : "BOth password Do not match"
        })
    }
    const loggedInUser = await User.findById(user._id)
    console.log(loggedInUser);
    const actualPassword = loggedInUser.password
    // console.log(actualPassword);
    // console.log(password);
    
    

    const checkPass = await bcrypt.compare(password,actualPassword)
    // console.log(checkPass);
    
    if(!checkPass){
       return  res.status(400).json({
            success : false,
            error : "Password are not valid"
        })
    }

    user.password = await bcrypt.hash(confirmNewPassword,10)
    await user.save()
    return res.status(200).json({
        message : "Password Updated Successfully"
    })

}
catch(err){
    return res.status(500).json({
        message : "Internal server error"
    })
}
}

const favouriteBlogsUser = async(req,res)=>{
    
        try{
            const {user} = req
            const populatedUser = await User.findById(user._id).populate('favouriteBlogs')
            const favouriteBlogs  = populatedUser.favouriteBlogs
            return res.status(200).json({
              success : true,
              favouriteBlogs
            })
        }
        catch(err){
            console.log(err);
            
            // res.status(500).json({
            //     message : "Internal server error"
            // })
        }
    
}





export {
    registerUser,
    loginUser,
    checkCookie,
    logoutUser,
    getProfileData,
    changePassword,
    favouriteBlogsUser
    
}