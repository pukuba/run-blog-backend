import { Db, ObjectId } from "mongodb"

export const getPost = async (parent: void, { id }: { id: string }, { db }: { db: Db }) => {
    return await db.collection("post").findOne({ _id: new ObjectId(id) })
}
