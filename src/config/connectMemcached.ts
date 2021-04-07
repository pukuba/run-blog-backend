import Memcached from "memcached"
import env from "config/env"
import { promisify } from "util"

const memcached = new Memcached(env.MEMCACHED_HOST)

const get = promisify(memcached.get).bind(memcached)
const set = promisify(memcached.set).bind(memcached)

export default {
    get,
    set
}