import { Db } from "mongodb"
import { md } from "lib/markdown"

export const createPost = async (
    parent: void, {
        title,
        category,
        author,
        content,
        tags
    }: {
        title: string,
        category: string,
        author: string,
        content: string,
        tags: string[]
    }, {
        db
    }: {
        db: Db
    }
) => {
    await db.collection("category").updateOne({ category }, { $inc: { cnt: 1 } }, { upsert: true })
    for (const tag of tags) {
        await db.collection("tag").updateOne({ tag }, { $inc: { cnt: 1 } }, { upsert: true })
    }
    return await db.collection("post").insertOne({
        title,
        category,
        tags,
        author,
        content,
        result: md.render(content)
    }).then(({ ops }) => ops[0])
}