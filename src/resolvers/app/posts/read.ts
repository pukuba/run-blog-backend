import { Db, ObjectId } from "mongodb"

export const getPost = async (parent: void, { id }: { id: string }, { db }: { db: Db }) => {
    return await db.collection("post").findOne({ _id: new ObjectId(id) })
}

export const allPosts = async (parent: void, { page }: { page: number }, { db }: { db: Db }) => {
    const left = (page - 1) * 10 + 1, right = page * 10
    return {
        postCount: await db.collection("post").estimatedDocumentCount(),
        posts: await db.collection("post").find({
            postNumber: { "$gte": left, "$lte": right }
        }).toArray()
    }
}

export const searchByKeyword = async (parent: void, { keyword, page }: { keyword: string, page: number }, { db }: { db: Db }) => {
    const left = (page - 1) * 10 + 1, right = page * 10
    return {
        postCount: await db.collection("problem").find({ title: { $regex: new RegExp(".*" + keyword) } }).count(),
        posts: await db.collection("problem").find({ title: { $regex: new RegExp(".*" + keyword) } }).skip(left).limit(right).toArray()
    }
}

export const searchByTags = async (parent: void, { tags, page }: { tags: string[], page: number }, { db }: { db: Db }) => {
    const left = (page - 1) * 10 + 1, right = page * 10
    return {
        postConut: await db.collection("post").find({ tags: { $all: tags } }).count(),
        posts: await db.collection("post").find({ tags: { $all: tags } }).skip(left).limit(right).toArray()
    }
}

export const searchByCategory = async (parent: void, { category, page }: { category: string, page: number }, { db }: { db: Db }) => {
    const left = (page - 1) * 10 + 1, right = page * 10
    return {
        postConut: await db.collection("post").find({ category }).count(),
        posts: await db.collection("post").find({ category }).skip(left).limit(right).toArray()
    }
}
