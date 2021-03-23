import * as readQuery from "resolvers/app/posts/read"
import * as createMutation from "resolvers/app/posts/create"

export const Query = {
    ...readQuery
}

export const Mutation = {
    ...createMutation
}