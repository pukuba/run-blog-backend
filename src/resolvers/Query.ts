import {
    getPost,
    getAllPosts,
    searchByKeyword,
    searchByTags,
    searchByCategory,
    getAllTags,
    getAllCategories
} from "resolvers/app/posts"

export default {
    test: () => "Server On",
    getPost,
    getAllPosts,
    searchByKeyword,
    searchByTags,
    searchByCategory,
    getAllTags,
    getAllCategories
}