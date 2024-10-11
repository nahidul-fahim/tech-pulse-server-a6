import { Types } from "mongoose";

export type TPost = {
    title: string;
    category: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    description: any;
    featuredImg: string;
    isPremium: boolean;
    user:Types.ObjectId;
    upvoteCount: number;
    comments: Types.ObjectId[];
    downvoteCount: number;
}
