import { Db } from "mongodb"
import { md } from "lib"
import { User } from "config/types"

export const createPost = async (
    parent: void, {
        title,
        category,
        content,
        tags
    }: {
        title: string,
        category: string,
        content: string,
        tags: string[]
    }, {
        db,
        user
    }: {
        db: Db,
        user: User
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
        author: user.name,
        content,
        date,
        postNumber: await db.collection("post").estimatedDocumentCount() + 1,
        result: md.render(content)
    }).then(({ ops }) => ops[0])
}