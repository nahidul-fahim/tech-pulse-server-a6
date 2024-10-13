import { Types } from "mongoose";

export type TComment = {
  comment: string;
  user: Types.ObjectId;
  post: Types.ObjectId;
};
