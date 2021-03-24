import DB from "config/connectMongo"
import { Db } from "mongodb"
import jwt from "jsonwebtoken"
const start = async () => {
    const x = jwt.sign({ name: "pukuba" }, "banana")
    const y = jwt.verify(x, "banana")
    console.log(y)
    const db: Db = await DB.get()
    const test = {
        name: "seung-won",
        id: "pukuba"
    }
    await db.collection("test").insertOne(test)
    const name = await db.collection("test").findOne({ id: "pukuba" }).then(x => x.sex)
    console.log(name)
    console.log(await db.collection("test").deleteOne({ id: "pukuba" }).then(({ result }) => result))
    await db.collection("test").deleteMany({ id: "pukuba" })
    process.exit(0)
}

start()