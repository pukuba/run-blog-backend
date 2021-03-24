import { Db } from "mongodb"
import { md } from "lib"

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
    const now = new Date();
    const date = now.toISOString().slice(2, 10).replace(/-/g, "");
    return await db.collection("post").insertOne({
        title,
        category,
        tags,
        author,
        content,
        date,
        postNumber: await db.collection("post").estimatedDocumentCount() + 1,
        result: md.render(content)
    }).then(({ ops }) => ops[0])
}