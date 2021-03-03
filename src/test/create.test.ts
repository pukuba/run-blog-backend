import assert from "assert"
import app from "index"
import request from "supertest"

import { mock1 } from "test/mock"

describe(`API-TEST Create`, () => {
    it(`Create Test-1`, async () => {
        const query = `
            mutation{
                createPost(
                    tilte:"${mock1.title}",
                    content:"${mock1.content}",
                    category:"${mock1.category}",
                    tags:["md","mocha"],
                    author:"${mock1.author}"
                ){
                    title
                    author
                    date
                }
            }
        `
        console.log(query)
        const res = await request(app)
            .post(`/api`)
            .set("Content-Type", "application/json")
            .send(JSON.stringify({ query }))
            .expect(200)
        const data = res.body.data.craetePost
        console.log(data)
    })
    it(`Server Running Test-2`, async () => {
        const query = `
            query{
                test1
            }
        `
        const res = await request(app)
            .get(`/api?query=${query}`)
            .expect(400)
        assert.strict(Array.isArray(res.body.errors[0].locations))
        assert.strictEqual(res.body.errors[0].message, `Cannot query field "test1" on type "Query". Did you mean "test"?`)
    })
})