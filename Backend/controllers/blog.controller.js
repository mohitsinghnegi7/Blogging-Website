import User from "../models/user.models.js";
import Blog from "../models/blog.models.js";
import Category from "../models/category.models.js";
import jwt from 'jsonwebtoken'


const fetchAllBlogs = async(req,res)=>{
    try{
        const allBlogs = await Blog.find().sort({createdAt : -1})
        return res.status(200).json({
            success : true,
            allBlogs
        })
    }
    catch(err){
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

const recentBlogs = async(req,res)=>{
    try{
        const allBlogs = await Blog.find().sort({createdAt : -1}).limit(4)
        return res.status(200).json({
            success : true,
            allBlogs
        })
    }
    catch(err){
        console.log(err);
        
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

const getDescription = async(req,res)=>{
    try{
        const token = req.cookies.token
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
            
        const user  = await User.findById(decoded.id)
        const {id} = req.params
        // console.log(id);
        const _id = id
        const blog = await Blog.findById({
            _id : id
        })
        if(!blog){
            return res.status(400).json({
                message : "No blog found"
            })
        }
        let favourite = false
        if(user && blog.favouriteBlogByUser.includes(user._id) ){
            favourite = true
        }

        return res.status(200).json({
            success : true,
            blog,
            favourite

        })
    }
    catch(err){
        
        
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

const addToFavourite = async(req,res)=>{
    try{
        const {user} = req
        const {id} = req.params
        const _id = id
        const blog = await Blog.findById({_id})
        const  existingUser = await User.findById(user._id)
        if(!blog){
            return res.status(400).json({
                message : "No blog found"
            })
        }
        blog.favouriteBlogByUser.push(user._id)
        existingUser.favouriteBlogs.push(_id)
        await blog.save()
        await existingUser.save()

        return res.status(200).json({
            message : "Blog added to favourite"
        })
    }
    catch(err){
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

const removeFavourite = async(req,res)=>{
    try{
        const {user} = req
        const {id} = req.params
        const _id = id
        const blog = await Blog.findById({_id})
        const  existingUser = await User.findById(user._id)
        if(!blog){
            return res.status(400).json({
                message : "No blog found"
            })
        }
       
        const userFavouriteIndex = existingUser.favouriteBlogs.indexOf(_id)
        if(userFavouriteIndex !== -1){
            existingUser.favouriteBlogs.splice(userFavouriteIndex,1);

        }
        else{
            return res.status(400).json({
                message : "Blog is not in user's favourite"
            })
        }

        const blogFavouriteIndex = blog.favouriteBlogByUser.indexOf(user._id)
        if(blogFavouriteIndex !== -1){
            blog.favouriteBlogByUser.splice(blogFavouriteIndex, 1);
        }
        await blog.save()
        await existingUser.save()

        return res.status(200).json({
            message : "Blog removed from favourite"
        })
    }
    catch(err){
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

export {
    fetchAllBlogs,
    recentBlogs,
    getDescription,
    addToFavourite,
    removeFavourite
}