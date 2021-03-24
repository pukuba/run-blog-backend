import * as readQuery from "resolvers/app/posts/query"
import * as createMutation from "resolvers/app/posts/mutation"

export const Query = {
    ...readQuery
}

export const Mutation = {
    ...createMutation
}