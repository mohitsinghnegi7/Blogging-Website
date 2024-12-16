import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'

const authMiddleware = {
    verifyToken : async(req,res,next)=>{
        const token = req.cookies.token
        //console.log(token);
        if(!token){
            return res.status(401).json({
                message : "Access Denied. No token provided"
            })
        }
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            
            const user  = await User.findById(decoded.id)
            if(!user){
                return res.status(400).json({
                    message : "User not found"
                })
            }

            req.user = user
            next()
        }
        catch(err){
            return res.status(500).json({
                message : "Internal server error"
            })
        }
        
    },

    authorizedRole  : (role)=>{
        return (req,res,next)=>{
            if(req.user.role !== role){
                return res.status(403).json({
                    message : "Access Denied"
                })
            }
            next()
        }
    }
}

export { 
    authMiddleware
}