import mongoose from "mongoose";

const { Schema, model } = mongoose;

const blogSchema = new Schema(
    {
        category:{
            type: String,
            required:true,
            description:"should be a string"
        },
        title:{
            type: String,
            required:true,
            description:"should be a string"
        },
        cover:{
            type: String,
            required:true,
            description:"should be a url"
        },
        readTime:{
            type: Object,
            properties:{
                value:{
                    type: Number,
                    required:true,
                    description:"should be a number"
                },
                unit:{
                    type: String,
                    required:true,
                    description:"should be a string"
                }
            }
        },
        author:{
            type: Object,
            required: true,
            properties:{
                name:{
                    type: String,
                    required:true,
                    description:"should be a string"
                },
                avatar:{
                    type: String,
                    required:true,
                    description:"should be a url"
                }
            }
        },
        content:{
            type: String,
            required:true,
            description: "should be a string"
        },
        comments:[
            {
                name:String,
                comment:String,
                createdAt: Date,
                updatedAt: Date
            }
        ]
    },
    {
        timestamps: true
    }
)

export default model("Blog", blogSchema)