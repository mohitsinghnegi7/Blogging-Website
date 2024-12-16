import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    },

    role : {
        type : String,
        required : true,
        default : "user",
        enum : ["user", "admin"]
    },
    favouriteBlogs : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Blog'
        }
    ],
    likedBlogs : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Blog'
        }
    ]
    
},{
    timestamps : true
})

const User = mongoose.model('User',userSchema);
export default User