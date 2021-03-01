import { Db } from "mongodb"
import { Loaders, Post, Comment } from "config/types"

export default {
    Post: {
        id: (parent: Post) => parent._id,
        comments: (parent: Post, args: void, { loaders }: { loaders: Loaders }) => loaders.commentsLoader.load(parent._id)
    },
    Comment: {
        id: (parent: Comment) => parent._id
    }
}