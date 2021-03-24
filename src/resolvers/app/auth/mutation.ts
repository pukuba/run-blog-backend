import { Db } from "mongodb"
import env from "config/env"
import { ApolloError } from "apollo-server-errors"
import cryptoRandomString from "crypto-random-string"
import { hashWithSalt, checkAuth } from "lib"
import jwt from "jsonwebtoken"
import { AsyncRedis } from "config/types"

export const register = async (
    parent: void, {
        name,
        key,
        id,
        pw
    }: {
        name: string,
        id: string,
        pw: string,
        key: string
    }, {
        db
    }: {
        db: Db
    }
) => {
    if (key !== env.AUTH_PW) {
        throw new ApolloError("The key does not match", "412")
    }
    if (await db.collection("user").findOne({ $or: [{ name }, { id }] }) !== null) {
        throw new ApolloError("The name already exists", "409")
    }
    const salt = cryptoRandomString(15)
    const result = await db.collection("user").insertOne({
        name,
        id,
        pw: hashWithSalt(pw, salt),
        salt
    }).then(({ result }) => result)
    return result.n === 1
}

export const login = async (
    parent: void, {
        id,
        pw
    }: {
        id: string,
        pw: string
    }, {
        db,
        redis
    }: {
        db: Db,
        redis: AsyncRedis
    }
) => {
    const salt = await db.collection("user").findOne({ id }).then(x => x.salt)
    const result = await db.collection("user").findOne({
        id,
        pw: hashWithSalt(pw, salt)
    })
    if (result === null) {
        throw new ApolloError("ID or password does not match", "403")
    }
    const token = jwt.sign({
        name: result.name,
        exp: Math.floor(Date.now() / 1000) + (60 * 30)
    }, env.JWT_PW)
    const refreshToken = jwt.sign({
        name: result.name,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    }, env.JWT_PW)
    await redis.setex(refreshToken, 60 * 60 * 24, result.name)
    return {
        token,
        refreshToken
    }
}

export const refreshLogin = async (
    parent: void, {
        refreshToken
    }: {
        refreshToken: string
    }, {
        redis,
        db
    }: {
        redis: AsyncRedis,
        db: Db
    }
) => {
    const name = await redis.get(refreshToken)
    const user = checkAuth(refreshToken)
    if (!name || user === null) {
        throw new ApolloError("RefreshToken is invalid", "401")
    }
    const result = await db.collection("user").findOne({ name }).then(x => x.name)
    if (!result) {
        throw new ApolloError("RefreshToken is invalid", "401")
    }
    return {
        token: jwt.sign({
            name,
            exp: Math.floor(Date.now() / 1000) + (60 * 30)
        }, env.JWT_PW)
    }
}

export const logout = () => {

}