import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FollowService } from './follow.service';

// Follow a user
const followUser = catchAsync(async (req: Request, res: Response) => {
    const { userId, targetUserId } = req.body;
    const result = await FollowService.followUser(userId, targetUserId);
    sendResponse(res, { statusCode: 200, success: true, message: result.message, data: [] });
});

// Unfollow a user
const unfollowUser = catchAsync(async (req: Request, res: Response) => {
    const { userId, targetUserId } = req.body;
    const result = await FollowService.unfollowUser(userId, targetUserId);
    sendResponse(res, { statusCode: 200, success: true, message: result.message, data: [] });
});

// Get followers of a user
const getFollowers = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FollowService.getFollowers(id);
    sendResponse(res, { statusCode: 200, success: true, message: 'Followers fetched successfully', data: result });
});

// Get following of a user
const getFollowing = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FollowService.getFollowing(id);
    sendResponse(res, { statusCode: 200, success: true, message: 'Following fetched successfully', data: result });
});

export const FollowController = {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing
};
