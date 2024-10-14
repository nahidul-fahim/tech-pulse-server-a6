import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";

// Follow a user
const followUser = async (userId: string, targetUserId: string) => {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    // Check if already following
    if (user.following!.includes(targetUserId)) {
        throw new AppError(httpStatus.BAD_REQUEST, 'You are already following this user');
    }

    // Add to following and followers list
    await User.updateOne(
        { _id: userId },
        { $push: { following: targetUserId } }
    )
    await User.updateOne(
        { _id: targetUserId },
        { $push: { followers: userId } }
    )
    return { message: 'User followed successfully' };
};

// Unfollow a user
const unfollowUser = async (userId: string, targetUserId: string) => {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    // Check if not following
    if (!user.following?.includes(targetUserId)) {
        throw new AppError(httpStatus.BAD_REQUEST, 'You are not following this user');
    }

    // Remove from following and followers list
    user.following = user.following?.filter(id => id !== targetUserId);
    targetUser.followers = targetUser.followers?.filter(id => id !== userId);

    await User.updateOne(
        { _id: userId },
        { $pull: { following: targetUserId } }
    )
    await User.updateOne(
        { _id: targetUserId },
        { $pull: { followers: userId } }
    )

    return { message: 'User unfollowed successfully' };
};

// Get followers
const getFollowers = async (userId: string) => {
    const user = await User.findById(userId).populate('followers', 'name email profileImg');
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user.followers;
};

// Get following
const getFollowing = async (userId: string) => {
    const user = await User.findById(userId).populate('following', 'name email profileImg');
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user.following;
};

export const FollowService = {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing
};
