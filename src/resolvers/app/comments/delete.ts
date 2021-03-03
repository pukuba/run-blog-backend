import { Db, ObjectId } from "mongodb"

export const deleteComment = async (
    parent: void, {
        id,
        pw
    }: {
        id: string,
        pw: string
    }, {
        db
    }: {
        db: Db
    }) => {
    try {
        return await db.collection("comment").deleteOne({ _id: new ObjectId(id), pw }).then(({ result }) => result.ok === 1 ? true : false)
    } catch {
        return false
    }
}