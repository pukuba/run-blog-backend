import { Db, ObjectId } from "mongodb"
import { hashWithSalt } from "lib/hash"

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
        const salt = await db.collection("comment").findOne({ _id: new ObjectId(id) }).then((e) => e.salt)
        return await db.collection("comment").deleteOne({
            _id: new ObjectId(id),
            pw: hashWithSalt(pw, salt)
        }).then(({ result }) => result.n === 1 ? true : false)
    } catch {
        return false
    }
}