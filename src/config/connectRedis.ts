import { createClient } from "redis"
import util from "util"
import env from "config/env"
const redis = createClient(6379, env.REDIS_HOST)
redis.on('error', (err) => {
    console.log(err)
})
const get = util.promisify(redis.get).bind(redis)
const setex = util.promisify(redis.setex).bind(redis)
const del = util.promisify(redis.del).bind(redis)
export default {
    get,
    setex,
    del
}