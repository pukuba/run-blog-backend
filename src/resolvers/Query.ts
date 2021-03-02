import {
    getPost,
    allPosts,
    searchByKeyword,
    searchByTags,
    searchByCategory
} from "resolvers/app/posts"

export default {
    test: () => "Server On",
    getPost,
    allPosts,
    searchByKeyword,
    searchByTags,
    searchByCategory
}