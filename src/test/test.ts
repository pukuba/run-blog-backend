import DB from "config/connectDB"
import { Db } from "mongodb"

const start = async () => {
    const db: Db = await DB.get()
    const test = {
        name: "seung-won",
        id: "pukuba"
    }
    const x = await db.collection("test").insertOne(test).then(({ ops }) => {
        ops[0].id = ops[0].id + ""
        return ops[0]
    })
    console.log(await db.collection("test").deleteOne({ _id: x._id }).then(({ result }) => result.ok))

}

start()