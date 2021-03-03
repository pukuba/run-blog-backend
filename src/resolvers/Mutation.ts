import {
    createPost
} from "resolvers/app/posts"

import {
    createComment,
    deleteComment
} from "resolvers/app/comments"

export default {
    createPost,
    createComment,
    deleteComment
}