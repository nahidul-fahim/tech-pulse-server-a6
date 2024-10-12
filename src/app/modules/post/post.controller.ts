import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostServices } from "./post.service";

const createNewPost = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const cloudinaryResult = req.cloudinaryResult;
  const result = await PostServices.createNewPostIntoDb({ user: userId, featuredImg: cloudinaryResult!.secure_url, ...req.body });
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Post created successfully",
    data: result,
  });
});


const getAllPosts = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostsFromDb(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Posts fetched successfully",
    data: result,
  });
});


const getUserAllPosts = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await PostServices.getUserPostsFromDb(userId, req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User posts fetched successfully",
    data: result,
  });
});


const getSinglePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.getSinglePostFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post fetched successfully",
    data: result,
  });
});


const updateSinglePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const cloudinaryResult = req.cloudinaryResult;
  const result = await PostServices.updatePostFromDb(cloudinaryResult, id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post updated successfully",
    data: result,
  });
});

const deleteSinglePost = catchAsync(async (req, res) => {
  const { userId, userRole } = req.user;
  const { id } = req.params;
  const result = await PostServices.deletePostFromDb(id, { userId, userRole });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post deleted successfully",
    data: result,
  });
});



const votePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { voteStatus } = req.body;
  const result = await PostServices.votePost(id, voteStatus);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post voted successfully",
    data: result,
  });
});


export const PostControllers = {
  createNewPost,
  getAllPosts,
  getUserAllPosts,
  getSinglePost,
  updateSinglePost,
  deleteSinglePost,
  votePost
};
