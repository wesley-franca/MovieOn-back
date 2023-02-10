import joi from "joi";

export const ratingMovieSchema = joi.object({
    liked: joi.boolean().required(),
});
