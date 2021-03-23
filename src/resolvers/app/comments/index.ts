import * as createMutation from "resolvers/app/comments/create"
import * as deleteMutation from "resolvers/app/comments/delete"

export const Mutation = {
    ...createMutation,
    ...deleteMutation
}

export const Query = {

}