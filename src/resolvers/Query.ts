import {
    getPost,
    allPosts,
    searchByKeyword,
    searchByTags,
    searchByCategory,
    getAllTags,
    getAllCategories
} from "resolvers/app/posts"

export default {
    test: () => "Server On",
    getPost,
    allPosts,
    searchByKeyword,
    searchByTags,
    searchByCategory,
    getAllTags,
    getAllCategories
}