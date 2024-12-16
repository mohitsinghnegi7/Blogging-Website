import User from "../models/user.models.js";
import Blog from "../models/blog.models.js";
import Category from "../models/category.models.js";

const addCategory = async(req,res)=>{
    try{
        const {category} = req.body;
        console.log(category);
        
        const title = category
        const checkCategory = await Category.findOne({
            title
        })
        if(checkCategory){
            return res.status(400).json({
                message : "Category Already exists"
            })
        }


        const newCategory = new Category({title})
        await newCategory.save()
        return res.status(200).json({
            success : true,
        message : "Category Added"        })

    }
    catch(err){
        return res.status(500).json({
            message : "Internal server error"
        })
    }
}

const getCategory = async(req,res)=>{
try{
    const categories = await Category.find()

    return res.status(200).json({
        success : true,
        categories
    })
}
catch(err){
return res.status(500).json({
    message : "internal server error"
})
}
}

const getBlogByCategory = async(req,res)=>{
    try{
        const {id} = req.params
        const _id = id
        const categories = await Category.findById(_id).populate('blogs')
    
        return res.status(200).json({
            success : true,
            blog : categories.blogs
        })
    }
    catch(err){
    return res.status(500).json({
        message : "internal server error"
    })
    }
}

export {
    addCategory,
    getCategory,
    getBlogByCategory
}