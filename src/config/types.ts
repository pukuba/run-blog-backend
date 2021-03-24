import { ObjectId } from "mongodb"
import DataLoader from "dataloader"
import { Callback } from "redis"
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

export interface User {
    name: string
}

export interface AsyncRedis {
    get(arg1: string): Promise<string | null>
    setex(args1: string, args2: number, args3: string): Promise<string>
}