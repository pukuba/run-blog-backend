import DataLoader from "dataloader"
import DB from "config/connectDB"
import { Comment } from "config/types"
import { ObjectId } from "mongodb"

const batchLoadCommentFn = async (postIds: readonly ObjectId[]) => {
    const db = await DB.get()
    const comments = await db.collection("comment").find({ postId: { $in: postIds } }).toArray()
    const table = [] = new Map()
    const resultArr: Comment[][] = Array.from(Array(postIds.length), () => [])
    postIds.forEach((postId: ObjectId, idx: number) => {
        table.set(postId + "", idx)
    })
    comments.forEach((comment: Comment) => {
        resultArr[table.get(comment.postId + "")].push(comment)
    })
    return resultArr
}

export const commentsLoader = () => new DataLoader(batchLoadCommentFn)