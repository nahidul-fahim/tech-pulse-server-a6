import { model, Schema } from "mongoose";
import { TComment } from "./comment.interface";

const commentSchema = new Schema<TComment>({
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  comment: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, required: true, ref: "Post" },
},
  {
    timestamps: true,
    versionKey: false,
  });

const Comment = model<TComment>("Comment", commentSchema);

export default Comment;
