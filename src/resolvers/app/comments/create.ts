import { Db } from "mongodb"

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
) => await db.collection("comment").insertOne({
    author,
    pw,
    ip,
    content: content.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
    postId
}).then(({ ops }) => ops[0])
