import DB from "config/connectDB"
import { Db } from "mongodb"

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
    const x = `
    <html> 
        <style>
            a{
                color:blue;
            }
        </style>
        <img src="https://avatars.githubusercontent.com/u/50164908?s=460&u=b46ea4f64589d0ff9ee224b33e4f57e9795911d6&v=4">
        <h1>
            heelo
        </h1>
        <script>
            alert("hello world!")
        </script>
    </html>
    `.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    console.log(x)
    process.exit(0)
}

start()