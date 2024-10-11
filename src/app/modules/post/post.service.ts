import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TPost } from "./post.interface";
import { Post } from "./post.model";

const createNewPostIntoDb = async (payload: TPost) => {
  const isUserExist = await User.findById(payload.user);
  if (!payload.featuredImg) {
    throw new AppError(404, "Featured image not found");
  }
  if (!isUserExist) {
    throw new AppError(404, "User not found");
  }
  const post = await Post.create(payload);
  return post;
};

const getAllPostsFromDb = async () => {
  const posts = await Post.find();
  return posts || [];
};

const getSinglePostFromDb = async (id: string) => {
  const post = await Post.findById(id);
  return post || {};
};

const updatePostFromDb = async (id: string, payload: Partial<TPost>) => {
  const postExist = await Post.findById(id);
  if (!postExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  }
  // Create a new object to hold the updates
  const updateData: Partial<TPost> = {};

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined) {
      updateData[key as keyof TPost] = value;
    }
  });

  // Update the post in the database
  const post = await Post.findByIdAndUpdate(id, updateData, { new: true });
  return post;
};

const deletePostFromDb = async (
  id: string,
  user: { userRole: string; userId: string }
) => {
  if (user?.userRole !== "admin") {
    const idMatch = await Post.findOne({ user: user?.userId });
    if (!idMatch) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You Do Not Have Access For This Action"
      );
    }
  }
  const postExist = await Post.findById(id);
  if (!postExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  }
  const post = await Post.findByIdAndDelete(id);
  return post;
};

const votePost = async (id: string, voteStatus: boolean) => {
  const postExist = await Post.findById(id);
  if (!postExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  }

  // Create an update object
  const updateData: { upvoteCount?: number; downvoteCount?: number } = {};

  // Increment the appropriate vote count based on voteStatus
  if (voteStatus) {
    updateData.upvoteCount = postExist.upvoteCount + 1; // Increment upvote count
  } else {
    updateData.downvoteCount = postExist.downvoteCount + 1; // Increment downvote count
  }

  // Update the post in the database
  const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });

  return updatedPost;
};


export const PostServices = {
  createNewPostIntoDb,
  getAllPostsFromDb,
  updatePostFromDb,
  getSinglePostFromDb,
  deletePostFromDb,
  votePost,
};
