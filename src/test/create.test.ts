import assert from "assert"
import app from "index"
import request from "supertest"
import { mock1 } from "test/mock"

const ids = []

describe(`API-TEST Create`, () => {
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