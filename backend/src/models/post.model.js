import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            maxLength: 200,
        },
        image: {
             type: String,
             deafault: "",
        },
        likes: [
            {
               
            },
        ],
        comments: [
            {
              
                 type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        ],
    },
     { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);

export default Post;