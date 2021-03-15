import assert from "assert"
import app from "index"
import { Db, ObjectId } from "mongodb"
import DB from "config/connectDB"
import request from "supertest"
import { mock1, mock2 } from "test/mock"

describe("API-TEST Read", () => {
    const postIds: string[] = []
    const commentIds: string[] = []
    before(async () => {
        const query1 = `
                mutation{
                    a:createPost(
                        content:${JSON.stringify(mock1.content)},
                        category:"${mock1.category}",
                        author:"${mock1.author}",
                        title:"${mock1.title}",
                        tags:[${mock1.tags}]
                    ){
                        id
                    }
                    b:createPost(
                        content:${JSON.stringify(mock2.content)},
                        category:"${mock2.category}",
                        author:"${mock2.author}",
                        title:"${mock2.title}",
                        tags:[${mock2.tags}]
                    ){
                        id
                    }
                }
            `
        const res1 = await request(app)
            .post(`/api`)
            .set("Content-Type", "application/json")
            .send(JSON.stringify({ query: query1 }))
            .expect(200)

        const data1 = res1.body.data
        postIds.push(...[data1.a.id, data1.b.id])
        const query2 = `
                mutation{
                    a:createComment(
                        content:"test comment1",
                        author:"Seung-won",
                        pw:"1234",
                        postId:"${postIds[0]}"
                    ){
                        id
                    }
                    b:createComment(
                        content:"test comment2",
                        author:"Nam-Seung-Won",
                        pw:"1234",
                        postId:"${postIds[1]}"
                    ){
                        id
                    }
                }
            `

        const res2 = await request(app)
            .post(`/api`)
            .set("Content-Type", "application/json")
            .send(JSON.stringify({ query: query2 }))
            .expect(200)

        const data2 = res2.body.data
        commentIds.push(...[data2.a.id, data2.b.id])
    })

    after(async () => {
        const db: Db = await DB.get()
        for (const id of commentIds) {
            await db.collection("comment").deleteOne({ _id: new ObjectId(id) })
        }
        for (const id of postIds) {
            await db.collection("post").deleteOne({ _id: new ObjectId(id) })
        }
        await db.collection("tag").updateOne({ tag: "Markdown" }, { $inc: { cnt: -1 } }, { upsert: true })
        await db.collection("tag").updateOne({ tag: "mocha" }, { $inc: { cnt: -2 } }, { upsert: true })
        await db.collection("tag").updateOne({ tag: "back-end" }, { $inc: { cnt: -1 } }, { upsert: true })
        await db.collection("category").updateOne({ category: "TEST" }, { $inc: { cnt: -1 } }, { upsert: true })
        await db.collection("category").updateOne({ category: "Interview" }, { $inc: { cnt: -1 } }, { upsert: true })
    })
    describe("Read All Post", () => {
        describe("Success", () => {
            it("Read All Post", async () => {
                const query = `
                    query{
                        getAllPosts{
                            postCount
                            posts{
                                author
                                id
                                title
                                category
                                tags
                                comments{
                                    author
                                    address
                                    content
                                    id
                                    postId
                                }
                                date
                            }
                        }
                    }
                `

                const res = await request(app)
                    .post("/api")
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(200)

                const data = res.body.data.getAllPosts

                assert.deepStrictEqual(data.postCount, 2)
                assert.deepStrictEqual(data.posts[0].author, "Pukuba")
                assert.deepStrictEqual(data.posts[0].title, "Test Mock1")
                assert.deepStrictEqual(data.posts[0].category, "TEST")
                assert.deepStrictEqual(data.posts[0].tags, ["Markdown", "mocha"])
                assert.deepStrictEqual(data.posts[0].comments[0].author, "Seung-won")
                assert.deepStrictEqual(data.posts[0].comments[0].address, "::ffff:127.0.0.1")
                assert.deepStrictEqual(data.posts[0].comments[0].content, "test comment1")
                assert.deepStrictEqual(data.posts[0].id, data.posts[0].comments[0].postId)

                assert.deepStrictEqual(data.posts[1].author, "pukuba")
                assert.deepStrictEqual(data.posts[1].title, "ODM ? ORM ?")
                assert.deepStrictEqual(data.posts[1].category, "Interview")
                assert.deepStrictEqual(data.posts[1].tags, ["back-end", "mocha"])
                assert.deepStrictEqual(data.posts[1].comments[0].author, "Nam-Seung-Won")
                assert.deepStrictEqual(data.posts[1].comments[0].address, "::ffff:127.0.0.1")
                assert.deepStrictEqual(data.posts[1].comments[0].content, "test comment2")
                assert.deepStrictEqual(data.posts[1].id, data.posts[1].comments[0].postId)
            })
        })
    })

    describe("Search By Tags", () => {
        describe("Success", () => {
            it("searchByTags - 1", async () => {
                const query = `
                    query{
                        searchByTags(tags:["mocha"]){
                            postCount
                            posts{
                                author
                                result
                                id
                                title
                                category
                                tags
                                comments{
                                    author
                                    content
                                    address
                                    postId
                                    id
                                    date
                                }
                                date
                            }
                        }
                    }
                `

                const res = await request(app)
                    .post("/api")
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(200)

                const data = res.body.data.searchByTags
                assert.deepStrictEqual(data.postCount, 2)
                assert(data.posts[0].tags.includes("mocha"))
                assert(data.posts[1].tags.includes("mocha"))
            })
            it("searchByTags - 2", async () => {
                const query = `
                    query{
                        searchByTags(tags:["mocha","Markdown"]){
                            postCount
                            posts{
                                author
                                result
                                id
                                title
                                category
                                tags
                                comments{
                                    author
                                    content
                                    address
                                    postId
                                    id
                                    date
                                }
                                date
                            }
                        }
                    }
                `

                const res = await request(app)
                    .post("/api")
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(200)

                const data = res.body.data.searchByTags
                assert.deepStrictEqual(data.postCount, 1)
                assert(data.posts[0].tags.includes("mocha"))
                assert(data.posts[0].tags.includes("Markdown"))
            })
            it("searchByTags - 3", async () => {
                const query = `
                    query{
                        searchByTags(tags:[""]){
                            postCount
                            posts{
                                author
                                result
                                id
                                title
                                category
                                tags
                                comments{
                                    author
                                    content
                                    address
                                    postId
                                    id
                                    date
                                }
                                date
                            }
                        }
                    }
                `

                const res = await request(app)
                    .post("/api")
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(200)

                const data = res.body.data.searchByTags
                assert.deepStrictEqual(data.postCount, 0)
            })
        })
    })

    describe("Search By Category", () => {
        describe("Success", () => {
            it("searchByCategory - 1", async () => {
                const query = `
                    query{
                        searchByCategory(category:"TEST"){
                            postCount
                            posts{
                                category
                            }
                        }
                    }
                `

                const res = await request(app)
                    .post("/api")
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(200)

                const data = res.body.data.searchByCategory
                assert.deepStrictEqual(data.postCount, 1)
                assert.deepStrictEqual(data.posts[0].category, "TEST")
            })
            it("searchByCategory - 2", async () => {
                const query = `
                    query{
                        searchByCategory(category:""){
                            postCount
                        }
                    }
                `

                const res = await request(app)
                    .post("/api")
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(200)

                const data = res.body.data.searchByCategory
                assert.deepStrictEqual(data.postCount, 0)
            })
        })
    })

    describe("Search By Keyword", () => {
        describe("Success", () => {
            it("searchByKeyword - 1", async () => {
                const query = `
                    query{
                        searchByKeyword(keyword:"Test"){
                            postCount
                            posts{
                                title
                            }
                        }
                    }
                `

                const res = await request(app)
                    .post("/api")
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(200)

                const data = res.body.data.searchByKeyword
                assert.deepStrictEqual(data.postCount, 1)
                assert(data.posts[0].title.includes("Test"))
            })

            it("searchByKeyword - 2", async () => {
                const query = `
                    query{
                        searchByKeyword(keyword:""){
                            postCount
                            posts{
                                title
                            }
                        }
                    }
                `

                const res = await request(app)
                    .post("/api")
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(200)

                const data = res.body.data.searchByKeyword
                assert.deepStrictEqual(data.postCount, 2)
                assert(data.posts[0].title.includes(""))
            })

            it("searchByKeyword - 3", async () => {
                const query = `
                    query{
                        searchByKeyword(keyword:"pukuba"){
                            postCount
                            posts{
                                title
                            }
                        }
                    }
                `

                const res = await request(app)
                    .post("/api")
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(200)

                const data = res.body.data.searchByKeyword
                assert.deepStrictEqual(data.postCount, 0)
            })
        })
    })
})