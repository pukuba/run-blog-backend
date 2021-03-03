import DB from "config/connectDB"
import { Db } from "mongodb"
import { md } from "lib/markdown"
const start = async () => {
    // const db: Db = await DB.get()
    // const test = {
    //     name: "seung-won",
    //     id: "pukuba"
    // }
    // const x = await db.collection("test").insertOne(test).then(({ ops }) => {
    //     ops[0].id = ops[0].id + ""
    //     return ops[0]
    // })
    // console.log(await db.collection("test").deleteOne({ _id: x._id }).then(({ result }) => result.ok))'
    const x = `# hello\n## hello\n### hello\n#### hello`
    console.log(md.render(x))
    process.exit(0)
}

start()