import { ObjectId } from "mongodb"
import DataLoader from "dataloader"

export interface Comment {
    author: string
    content: string
    blog: string
    address: string
    postId: ObjectId
    _id: ObjectId
}

export interface Loaders {
    commentsLoader: DataLoader<ObjectId, any, ObjectId>
}

export interface Post {
    author: string
    title: string
    content: string
    _id: ObjectId
}