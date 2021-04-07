import { createClient } from "redis"
import { promisify } from "util"
import env from "config/env"
const redis = createClient(6379, env.REDIS_HOST)
redis.on('error', (err) => {
    console.log(err)
})
const get = promisify(redis.get).bind(redis)
const setex = promisify(redis.setex).bind(redis)
const del = promisify(redis.del).bind(redis)
export default {
    get,
    setex,
    del
}