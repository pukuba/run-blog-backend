import { Db, ObjectId } from "mongodb"
import cryptoRandomString from "crypto-random-string"

import { hashWithSalt } from "lib"

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
        author,
        pw: hashWithSalt(pw, salt),
        address: ip,
        salt,
        date: new Date().toISOString().slice(2, 10).replace(/-/g, ""),
        content: content.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
        postId: new ObjectId(postId)
    }).then(({ ops }) => ops[0])

}