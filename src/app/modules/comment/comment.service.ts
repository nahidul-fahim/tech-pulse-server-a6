import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Post } from "../post/post.model";
import { User } from "../user/user.model";
import { TComment } from "./comment.interface";
import Comment from "./comment.model";

const createNewCommentIntoDb = async (payload: TComment) => {
  const user = await User.findById(payload.user);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  const post = await Post.findById(payload.post);
  if (!post) {
    throw new AppError(404, "Post not found");
  }
  const comment = await Comment.create(payload);
  post.comments.push(comment._id);
  await post.save();
  return comment;
};

const editCommentFromDb = async (payload: { id: string, comment: string, user: string }) => {
  const comment = await Comment.findById(payload.id);
  if (!comment) {
    throw new AppError(httpStatus.NOT_FOUND, "Comment not found");
  }
  if (comment.user.toString() !== payload.user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized to edit this comment");
  }
  const updatedComment = await Comment.findByIdAndUpdate(
    payload.id,
    { comment: payload.comment },
    {
      new: true,
    }
  );
  return updatedComment;
};

const deleteCommentFromDb = async (payload: { id: string; user: string }) => {
  // Find the comment by ID
  const comment = await Comment.findById(payload.id);
  if (!comment) {
    throw new AppError(httpStatus.NOT_FOUND, "Comment not found");
  }

  // Check if the user is authorized to delete the comment
  if (comment.user.toString() !== payload.user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized to delete this comment");
  }

  // Delete the comment
  const deletedComment = await Comment.findByIdAndDelete(payload.id);

  // Find the associated post and ensure it exists
  const post = await Post.findById(comment.post);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Associated post not found");
  }

  // Remove the comment ID from the post's comments array using filter
  post.comments = post.comments.filter(
    (commentId) => commentId.toString() !== payload.id
  );

  await post.save();

  return deletedComment;
};


const getAllCommentForAPostFromDb = async (id: string) => {
  const comments = await Comment.find({ post: id }).populate("user");
  return comments;
};

const getSingleCommentFromDb = async (id: string) => {
  const comment = await Comment.findById(id).populate("user");
  return comment;
};


export const commentServices = { createNewCommentIntoDb, editCommentFromDb, deleteCommentFromDb, getAllCommentForAPostFromDb, getSingleCommentFromDb };
