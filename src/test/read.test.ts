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
    })
    describe("Read Post", () => {
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
                console.log(data)

            })
        })
    })
})