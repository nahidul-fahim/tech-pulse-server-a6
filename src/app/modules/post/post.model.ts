import { Schema, model } from "mongoose";
import { TPost } from "./post.interface";

// Post Schema Definition
const postSchema = new Schema<TPost>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    featuredImg: {
      type: String,
      required: true
    },
    downvoteCount: {
      type: Number,
      default: 0
    },
    upvoteCount: {
      type: Number,
      default: 0
    },
    isPremium: {
      type: Boolean,
      default: false
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "Comment"
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


// Export the post model
export const Post = model<TPost>("post", postSchema);
