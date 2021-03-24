import { Mutation as posts } from "resolvers/app/posts"
import { Mutation as comments } from "resolvers/app/comments"
import { Mutation as auth } from "resolvers/app/auth"
export default {
    ...posts,
    ...comments,
    ...auth
}