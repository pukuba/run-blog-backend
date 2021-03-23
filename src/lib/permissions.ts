import { rule, shield } from "graphql-shield"
import { User } from "config/types"

const isCreater = rule()((parent: void, args: void, { user }: { user: User }) => user.name !== null)

export const permissions = shield({
    Mutation: {
        createPost: isCreater
    }
})