import assert from "assert"
import app from "index"
import { Db, ObjectId } from "mongodb"
import DB from "config/connectDB"
import request from "supertest"
import { mock1, mock2 } from "test/mock"

const ids: string[] = []

describe(`API-TEST Create`, () => {

    after(async () => {
        const db: Db = await DB.get()
        for (const id of ids) {
            await db.collection("post").deleteOne({ _id: new ObjectId(id) })
        }
        await db.collection("tag").updateOne({ tag: "Markdown" }, { $inc: { cnt: -1 } }, { upsert: true })
        await db.collection("tag").updateOne({ tag: "mocha" }, { $inc: { cnt: -1 } }, { upsert: true })
        await db.collection("tag").updateOne({ tag: "back-end" }, { $inc: { cnt: -1 } }, { upsert: true })
    })

    describe(`Create Post`, () => {
        describe("Success", () => {
            it(`Create Test-1`, async () => {
                const query = `
                    mutation{
                        createPost(
                            content:${JSON.stringify(mock1.content)},
                            category:"${mock1.category}",
                            author:"${mock1.author}",
                            tags:[${mock1.tags}],
                            title:"${mock1.title}"
                        ){
                            title
                            result
                            date
                            tags
                            author
                            id
                            category
                        }
                    }
                `

                const res = await request(app)
                    .post(`/api`)
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(200)
                const data = res.body.data.createPost
                assert.deepStrictEqual(data.title, "Test Mock1")
                assert.deepStrictEqual(data.tags, ["Markdown", "mocha"])
                assert.deepStrictEqual(data.category, "TEST")
                assert.deepStrictEqual(Object.keys(data).length, 7)
                ids.push(data.id)
            })

            it(`Create Test-2`, async () => {
                const query = `
                    mutation{
                        createPost(
                            content:${JSON.stringify(mock2.content)},
                            category:"${mock2.category}",
                            author:"${mock2.author}",
                            tags:[${mock2.tags}],
                            title:"${mock2.title}"
                        ){
                            title
                            result
                            date
                            tags
                            author
                            id
                            category
                        }
                    }
                `

                const res = await request(app)
                    .post(`/api`)
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(200)
                const data = res.body.data.createPost
                assert.deepStrictEqual(data.title, mock2.title)
                assert.deepStrictEqual(data.tags, ["back-end"])
                assert.deepStrictEqual(data.category, "Interview")
                assert.deepStrictEqual(Object.keys(data).length, 7)
                ids.push(data.id)
            })
        })

        describe("Failure", () => {
            it("Create Test-1", async () => {
                const query = `
                    mutation{
                        createPost(
                            content:${JSON.stringify(mock1.content)},
                            category:"${mock1.category}",
                            author:"${mock1.author}",
                            title:"${mock1.title}"
                        ){
                            title
                            result
                            date
                            tags
                            author
                            id
                            category
                        }
                    }
                `

                await request(app)
                    .post(`/api`)
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(400)
            })
            it("Create Test-2", async () => {
                const query = `
                    mutation{
                        createPost(
                            content:${JSON.stringify(mock1.content)},
                            category:"${mock1.category}",
                            author:123,
                            title:"1",
                            tags:[${mock1.tags}],
                        ){
                            title
                            result
                            date
                            tags
                            author
                            id
                            category
                        }
                    }
                `

                await request(app)
                    .post(`/api`)
                    .set("Content-Type", "application/json")
                    .send(JSON.stringify({ query }))
                    .expect(400)
            })
        })
    })
    describe("Create Comment", () => {

    })
})