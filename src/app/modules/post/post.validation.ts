import { z } from "zod";

const createNewPostValidationSchema = z.object({
    body: z.object({
        title: z.string({
            invalid_type_error: "title must be a string",
            required_error: "Please provide a title for your post",
        }),
        description: z.string({
            invalid_type_error: "description must be a string",
            required_error: "Please provide a description for your post",
        }),
        category: z.string({
            invalid_type_error: "category must be a string",
            required_error: "Please provide a category for your post",
        }),
        downvoteCount: z.number().optional(),
        upvoteCount: z.number().optional(),
        isPremium: z.boolean().optional(),
    }),
});

// update post validation schema
const updatePostValidationSchema = z.object({
    body: z.object({
        title: z.string({
            invalid_type_error: "title must be a string",
            required_error: "Please provide a title for your post",
        }).optional(),
        description: z.string({
            invalid_type_error: "description must be a string",
            required_error: "Please provide a description for your post",
        }).optional(),
        isPremium: z.boolean().optional(),
        category: z.string({
            invalid_type_error: "category must be a string",
            required_error: "Please provide a category for your post",
        }).optional(),
    }),
});


const votePostValidationSchema = z.object({
    body: z.object({
        voteStatus: z.boolean({
            required_error: "voteStatus is required",
            invalid_type_error: "voteStatus must be a boolean",
        }),
    }),
});


export const PostValidations = {
    createNewPostValidationSchema,
    updatePostValidationSchema,
    votePostValidationSchema
}