/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { commentServices } from "./comment.service";

const createNewComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const result = await commentServices.createNewCommentIntoDb({
    user: userId,
    post: id as any,
    comment: req.body.comment,
  });
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Comment created successfully",
    data: result,
  });
});

const editComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await commentServices.editCommentFromDb({id, comment:req.body.comment,user:req.user.userId});
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment updated successfully",
    data: result,
  });
});


const deletedComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await commentServices.deleteCommentFromDb({id,user:req.user.userId});
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment deleted successfully",
    data: result,
  });
});


const getAllCommentForAPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await commentServices.getAllCommentForAPostFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment fetched For Specific Post successfully",
    data: result,
  });
});


const getSingleComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await commentServices.getSingleCommentFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment fetched successfully",
    data: result,
  });
});

export const CommentControllers = { createNewComment, editComment,deletedComment,getAllCommentForAPost,getSingleComment };
