import { z } from "zod";

export const createCommentSchema = z.object({
    body: z.object({
        comment: z.string({
            required_error: "Comment is required"
        })
    })
})


export const CommentValidation = { createCommentSchema }


