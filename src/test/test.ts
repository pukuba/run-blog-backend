import DB from "config/connectDB"
import { Db } from "mongodb"
import { md } from "lib/markdown"
const start = async () => {
    const db: Db = await DB.get()
    const test = {
        name: "seung-won",
        id: "pukuba"
    }
    await db.collection("test").insertOne(test)
    const name = await db.collection("test").findOne({ id: "pukuba" }).then(x => x.name)
    console.log(name)
    console.log(await db.collection("test").deleteOne({ id: "pukuba" }).then(({ result }) => result))
    await db.collection("test").deleteMany({ id: "pukuba" })
    process.exit(0)
}

start()