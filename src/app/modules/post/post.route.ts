import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { PostValidations } from "./post.validation";
import { PostControllers } from "./post.controller";
import auth from "../../middlewares/auth";
import { sendImageToCloudinary, upload } from "../../utils/sendImageToCloudinary";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-new-post",
  auth(USER_ROLE.user),
  upload.single('file'),
  sendImageToCloudinary,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(PostValidations.createNewPostValidationSchema),
  PostControllers.createNewPost
);

// get all the posts
router.get(
  "/get-posts",
  PostControllers.getAllPosts
);

// get user all posts
router.get(
  "/get-user-posts",
  auth(USER_ROLE.user),
  PostControllers.getUserAllPosts
)

// get single post by id
router.get(
  "/get-post/:id",
  PostControllers.getSinglePost
);

// update a post
router.put(
  "/update-post/:id",
  auth(USER_ROLE.user),
  upload.single('file'),
  sendImageToCloudinary,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(PostValidations.updatePostValidationSchema),
  PostControllers.updateSinglePost
);

// delete a post
router.delete(
  "/delete-post/:id",
  auth(USER_ROLE.user, USER_ROLE.admin),
  PostControllers.deleteSinglePost
);

// vote a post
router.patch(
  "/vote-post/:id",
  validateRequest(PostValidations.votePostValidationSchema),
  PostControllers.votePost
);

const PostRoutes = router;
export default PostRoutes;
