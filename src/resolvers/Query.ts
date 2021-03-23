import { Query as posts } from "resolvers/app/posts"
import { Query as comments } from "resolvers/app/comments"

const test = () => "Server On"

export default {
    test,
    ...posts,
    ...comments
}