import DataLoader from "dataloader"
import DB from "config/connectDB"
import { Comment } from "config/types"
import { ObjectId } from "mongodb"

const batchLoadCommentFn = async (postIds: readonly ObjectId[]) => {
    const db = await DB.get()
    const comments = await db.collection("comment").find({ postId: { $in: postIds } }).toArray()
    return postIds.map((id: ObjectId) => comments.filter((c: Comment) => c.postId == id))
}

export const commentsLoader = () => new DataLoader(batchLoadCommentFn)