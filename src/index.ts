import dotenv from "dotenv"
dotenv.config()

import { ApolloServer, ApolloError } from "apollo-server-express"
import { readFileSync } from "fs"
import { createServer } from "http"
import { applyMiddleware } from "graphql-middleware"
import queryComplexity, { simpleEstimator } from "graphql-query-complexity"
import depthLimit from "graphql-depth-limit"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { checkAuth } from "lib/auth"

import Mongo from "config/connectMongo"
import Redis from "config/connectRedis"
import { commentsLoader } from "lib/dataloader"
import { permissions } from "lib/permissions"

import express from "express"
import expressPlayground from "graphql-playground-middleware-express"
import bodyParser from "body-parser"
import resolvers from "resolvers"
const typeDefs = readFileSync("src/typeDefs.graphql", "utf-8")
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/graphql", expressPlayground({ endpoint: "/api" }))

const start = async () => {
    const db = await Mongo.get()
    const redis = Redis
    const server = new ApolloServer({
        schema: applyMiddleware(schema, permissions),
        context: ({ req, connection }) => {
            const token = req?.headers.authorization || connection?.context.authorization
            return {
                db,
                redis,
                loaders: {
                    commentsLoader: commentsLoader()
                },
                ip: req.headers["x-forwarded-for"] || req.ip,
                user: checkAuth(token)
            }
        },
        validationRules: [
            depthLimit(7),
            queryComplexity({
                estimators: [
                    simpleEstimator({ defaultComplexity: 1 })
                ],
                maximumComplexity: 1000,
                onComplete: (complexity: number) => {
                    console.log(`Query Complexity: ${complexity}`)
                },
                createError: (max: number, actual: number) => {
                    return new ApolloError(`Query is too complex: ${actual}. Maximum allowed complexity: ${max}`);
                },

            })
        ]
    })

    server.applyMiddleware({
        app,
        path: "/api"
    })

    const httpServer = createServer(app)
    httpServer.timeout = 5000
    httpServer.listen({ port: process.env.PORT || 3000 }, () => {
        console.log(`GraphQL Server Running at http://localhost:${process.env.PORT || 3000}/api`)
    })
}

start()

export default app