import { Db } from "mongodb"
import { Loaders, Post } from "config/types"

export default {
    Post: {
        comments: (parent: Post, args: void, { db, loaders }: { db: Db, loaders: Loaders }) => loaders.commentsLoader.load(parent._id)
    }
}