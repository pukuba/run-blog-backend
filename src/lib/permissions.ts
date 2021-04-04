import { rule, shield } from "graphql-shield"
import { User } from "config/types"

const isValid = rule()((parent: void, args: void, { user }: { user: User }) => user !== null)

const isNull = rule()((parent: void, args: void, { user }: { user: User }) => user === null)

export const permissions = shield({
    Mutation: {
        createPost: isValid,
        unRegister: isValid,
        register: isNull
    }
})