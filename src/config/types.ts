import { ObjectId } from "mongodb"
import DataLoader from "dataloader"

export interface Comment {
    author: string
    content: string
    address: string
    postId: ObjectId
    _id: ObjectId
    pw: string
    date: string
}

export interface Loaders {
    commentsLoader: DataLoader<ObjectId, any, ObjectId>
}

export interface Post {
    author: string
    title: string
    content: string
    result: string
    _id: ObjectId
    category: string
    tags: string[]
    postNumber: number
    date: string
}