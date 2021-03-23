import { Mutation as posts } from "resolvers/app/posts"
import { Mutation as comments } from "resolvers/app/comments"

export default {
    ...posts,
    ...comments
}