import jwt from "jsonwebtoken"
import env from "config/env"

export const checkAuth = (token: string) => {
    try {
        return jwt.verify(
            token,
            env.JWT_PW
        )
    } catch {
        return {
            name: null
        }
    }
}