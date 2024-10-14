import express from 'express';
import { FollowController } from './follow.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Follow a user
router.post('/follow-user', auth('admin', 'user'), FollowController.followUser);

// Unfollow a user
router.post('/unfollow-user', auth('admin', 'user'), FollowController.unfollowUser);

// Get user's followers
router.get('/user-followers/:id', auth('admin', 'user'), FollowController.getFollowers);

// Get user's following
router.get('/user-following/:id', auth('admin', 'user'), FollowController.getFollowing);

export const FollowRoutes = router;