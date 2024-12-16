import User from '../models/user.models.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Blog from '../models/blog.models.js'
import Category from '../models/category.models.js'

const loginAdmin = async(req,res)=>{
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
        // console.log(existedUser);
        
        // console.log(password);
        // console.log(existedUser.password);
        
        
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

const addBlog = async(req,res)=>{
    try{
        const {title ,description,image,categoryId} = req.body
        console.log(title);
        console.log(description );
        //  console.log(image);
        
        
        const category = categoryId

        if(!title || !description || !image || !category){
            return res.status(400).json({
                message : "All fields are required"
            })

        }

        const existingCategory = await Category.findOne({
           title: category
        })

        if(!existingCategory){
            return res.status(400).json({
                message : "The Category doesn't exist"
            })
        }

        
        
        const newBlog = new Blog({
            title, 
            description,
            image,
            
        })
        existingCategory.blogs.push(newBlog._id)
        await existingCategory.save()

        await newBlog.save()
        return res.status(200).json({
            success : true,
            message : "Blog Added"
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal Server error"
        })
    }
}

export {
    loginAdmin,
    addBlog
}