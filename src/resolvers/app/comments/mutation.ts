import { Db, ObjectId } from "mongodb"
import { hashWithSalt } from "lib"
import cryptoRandomString from "crypto-random-string"

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

export const createComment = async (
    parent: void, {
        author,
        pw,
        content,
        postId
    }: {
        author: string,
        pw: string,
        content: string,
        postId: string
    }, {
        db,
        ip
    }: {
        db: Db,
        ip: string
    }
) => {
    const salt = cryptoRandomString(15)
    return await db.collection("comment").insertOne({
        author: author.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
        pw: hashWithSalt(pw, salt),
        address: ip,
        salt,
        date: new Date().toISOString().slice(2, 10).replace(/-/g, ""),
        content: content.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
        postId: new ObjectId(postId)
    }).then(({ ops }) => ops[0])
}