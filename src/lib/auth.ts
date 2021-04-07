import jwt from "jsonwebtoken"
import env from "config/env"
import memcached from "config/connectMemcached"

export const checkAuth = async (token: string) => {
    const result = await memcached.get(token)
    if (result) return null
    try {
        return jwt.verify(
            token,
            env.JWT_PW
        )
    } catch {
        return null
    }
}