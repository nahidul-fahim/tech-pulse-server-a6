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

router.get("/get-posts", PostControllers.getAllPosts);

router.get("/get-post/:id", PostControllers.getSinglePost);

router.put("/update-post/:id", auth("user"), PostControllers.updateSinglePost);

router.delete("/delete-post/:id", auth("user","admin"), PostControllers.deleteSinglePost);

router.patch("/vote-post/:id", auth("user"),validateRequest(PostValidations.votePostValidationSchema), PostControllers.votePost);

const PostRoutes = router;
export default PostRoutes;
