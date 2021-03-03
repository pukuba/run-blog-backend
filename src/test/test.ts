import DB from "config/connectDB"
import { Db } from "mongodb"

const start = async () => {
    const db: Db = await DB.get()
    const test = {
        name: "seung-won",
        id: "pukuba"
    }
    console.log(await db.collection("test").insertOne(test).then(({ ops }) => ops[0]))
}

start()