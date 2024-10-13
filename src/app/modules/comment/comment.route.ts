import express from "express"
import validateRequest from "../../middlewares/validateRequest"
import { CommentValidation } from "./comment.validation"
import { CommentControllers } from "./comment.controller";
import auth from "../../middlewares/auth";
const router = express.Router()

router.post("/create-comment/:id",auth('user','admin') ,validateRequest(CommentValidation.createCommentSchema), CommentControllers.createNewComment);


router.patch("/edit-comment/:id",auth('user','admin') ,validateRequest(CommentValidation.createCommentSchema), CommentControllers.editComment);

router.delete("/delete-comment/:id",auth('user','admin'), CommentControllers.deletedComment);

router.get("/get-comments/:id", CommentControllers.getAllCommentForAPost);

router.get("/get-comment/:id", CommentControllers.getSingleComment);

const commentRoutes = router;

export default commentRoutes;