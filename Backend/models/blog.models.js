import mongoose  from "mongoose";

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },

    description : {
        type : String,
        required : true,
    },

    image : {
        type : String,
        required : true
    },

    likes : {
        type : Number,
        default : 0
    },
    category : {
        type : String
    },
    favouriteBlogByUser : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
    likedBlogByUser : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ]


   
    
},{
    timestamps : true
})

const Blog = mongoose.model('Blog',blogSchema);
export default Blog